import { parseResumeFromPdfBlob } from "@/lib/parse-resume-from-pdf";
import { generateResumePdfBlob } from "@/lib/exportPdf";
import { ResumePdfData } from "@/lib/pdf/types";
import { sectionHasPdfContent } from "@/lib/pdf/buildResumePdfData";
import {
  isEducationFilled,
  isExperienceFilled,
  isProjectFilled,
} from "@/lib/resumeContent";
import { SectionKey } from "@/types/resume";
import { TextItems } from "@/lib/parse-resume-from-pdf/types";
import { ParsedResume } from "@/types/parsedResume";
import { ExperienceItem } from "@/types/resume";
import {
  AtsCheck,
  AtsCheckStatus,
  AtsReport,
  getAtsParseRateSummary,
} from "@/lib/atsScore";
import { computeAtsParseRate } from "@/lib/atsParseRate";

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function digitsOnly(text: string): string {
  return text.replace(/\D/g, "");
}

function includesFuzzy(haystack: string, needle: string): boolean {
  const n = normalize(needle);
  if (!n) return false;
  const h = normalize(haystack);
  if (h.includes(n)) return true;
  if (n.length >= 4 && h.split(" ").some((word) => word.startsWith(n.slice(0, 4)))) {
    return true;
  }
  return false;
}

function buildRawText(textItems: TextItems): string {
  return textItems.map((item) => item.text).join(" ");
}

function phoneInText(phone: string, haystack: string): boolean {
  const digits = digitsOnly(phone);
  if (digits.length < 7) return false;
  const rawDigits = digitsOnly(haystack);
  return (
    rawDigits.includes(digits) ||
    rawDigits.includes(digits.slice(-10)) ||
    rawDigits.includes(digits.slice(-8))
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function hasBulletContent(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  const lines = trimmed.split("\n").filter((line) => line.trim());
  if (lines.length >= 2) return true;
  return /[-•*]\s/.test(trimmed) || /^\d+\./m.test(trimmed);
}

function structuredSectionFound(
  sectionNames: string[],
  keyword: string
): boolean {
  return sectionNames.some((name) => normalize(name).includes(keyword));
}

function check(
  id: string,
  label: string,
  detail: string,
  status: AtsCheckStatus,
  weight: number
): AtsCheck {
  return { id, label, detail, status, weight };
}

function countExperiencesInText(
  experiences: ExperienceItem[],
  haystack: string
): number {
  return experiences.filter(
    (exp) =>
      includesFuzzy(haystack, exp.jobTitle) ||
      includesFuzzy(haystack, exp.companyName)
  ).length;
}

function countParsedRoles(parsed: ParsedResume): number {
  return parsed.workExperiences.filter(
    (exp) => exp.jobTitle.trim() || exp.company.trim()
  ).length;
}

function countParsedSkills(parsed: ParsedResume): number {
  return [
    ...parsed.skills.descriptions,
    ...parsed.skills.featuredSkills.map((s) => s.skill),
  ].filter((s) => s.trim()).length;
}

function experienceParseCheck(
  rolesParsed: number,
  rolesInRaw: number,
  total: number
): { status: AtsCheckStatus; detail: string } {
  if (total === 0) {
    return {
      status: "warn",
      detail: "No experience entries to evaluate.",
    };
  }

  const parseRatio = rolesParsed / total;
  const textRatio = rolesInRaw / total;

  if (parseRatio >= 0.95) {
    return {
      status: "pass",
      detail: `Parser structured ${rolesParsed} of ${total} roles — ATS can map work history fields.`,
    };
  }

  if (parseRatio >= 0.65) {
    return {
      status: "warn",
      detail: `Parser only structured ${rolesParsed} of ${total} roles. Some entries may lose job title/company mapping.`,
    };
  }

  if (textRatio >= 0.85) {
    return {
      status: "warn",
      detail: `${rolesInRaw} of ${total} roles are readable as text, but the parser couldn't structure them — typical for two-column layouts.`,
    };
  }

  if (textRatio >= 0.5) {
    return {
      status: "warn",
      detail: `Only ${rolesInRaw} of ${total} roles found in PDF text.`,
    };
  }

  return {
    status: "fail",
    detail: `Only ${rolesInRaw} of ${total} roles detected — ATS may miss your work history.`,
  };
}

export async function analyzeAtsFromPdf(
  data: ResumePdfData
): Promise<AtsReport> {
  const blob = await generateResumePdfBlob(data);
  const {
    resume: parsed,
    textItems,
    structuredSectionNames,
    keywordHints,
    isMultiColumn,
  } = await parseResumeFromPdfBlob(blob);

  const rawText = buildRawText(textItems);
  const filledExperiences = data.experiences.filter(isExperienceFilled);
  const filledEducations = data.educations.filter(isEducationFilled);
  const filledProjects = data.projects.filter(isProjectFilled);
  const visibleSkills = data.skills.filter((skill) => skill.trim() !== "");

  const exportSection = (key: SectionKey) => sectionHasPdfContent(key, data);
  const exportExperience = exportSection("experience");
  const exportEducation = exportSection("education");
  const exportSkills = exportSection("skill");
  const exportProjects = exportSection("project");

  const rolesInRawText = countExperiencesInText(filledExperiences, rawText);
  const rolesParsed = countParsedRoles(parsed);
  const parsedSkills = countParsedSkills(parsed);
  const accomplishmentText = filledExperiences
    .map((exp) => exp.accomplishments)
    .join("\n");

  const checks: AtsCheck[] = [
    check(
      "text-layer",
      "Machine-readable PDF",
      textItems.length > 20
        ? `${textItems.length} text elements extracted — PDF is not image-only.`
        : "Very little selectable text — many ATS systems will reject this file.",
      textItems.length > 20 ? "pass" : "fail",
      12
    ),
  ];

  if (isMultiColumn) {
    checks.push(
      check(
        "layout",
        "Two-column layout",
        "Two-column PDF detected. Many ATS parsers (including this one) struggle to map fields in multi-column resumes.",
        "warn",
        8
      )
    );
  }

  const nameFilled = data.basicInfo.fullName.trim().length > 0;
  const nameInRaw = nameFilled && includesFuzzy(rawText, data.basicInfo.fullName);
  const nameStructured =
    nameFilled && includesFuzzy(parsed.profile.name, data.basicInfo.fullName);
  checks.push(
    check(
      "name-readable",
      "Name in PDF text",
      !nameFilled
        ? "Add your full name — ATS contact parsing requires it."
        : nameInRaw
          ? "Your name appears in the selectable PDF text."
          : "Name missing from PDF text layer.",
      !nameFilled ? "fail" : nameInRaw ? "pass" : "fail",
      8
    ),
    check(
      "name-structured",
      "Name field parsed",
      !nameFilled
        ? "No name to parse yet."
        : nameStructured
          ? `Parser mapped name to “${parsed.profile.name.trim()}”.`
          : "Parser could not isolate your name into a structured contact field.",
      !nameFilled ? "fail" : nameStructured ? "pass" : "warn",
      10
    )
  );

  const emailFilled = data.basicInfo.email.trim().length > 0;
  const emailInRaw = emailFilled && includesFuzzy(rawText, data.basicInfo.email);
  const emailStructured =
    emailFilled &&
    isValidEmail(parsed.profile.email) &&
    includesFuzzy(parsed.profile.email, data.basicInfo.email);
  checks.push(
    check(
      "email-readable",
      "Email in PDF text",
      !emailFilled
        ? "Add an email address — most ATS systems reject resumes without one."
        : emailInRaw
          ? "Email is present in PDF text."
          : "Email missing from PDF text — ATS contact parsing will fail.",
      !emailFilled ? "fail" : emailInRaw ? "pass" : "fail",
      8
    ),
    check(
      "email-structured",
      "Email field parsed",
      !emailFilled
        ? "No email to parse yet."
        : emailStructured
          ? "Parser extracted email into a structured contact field."
          : "Email is in PDF but parser couldn't map it to a contact field.",
      !emailFilled ? "fail" : emailStructured ? "pass" : "warn",
      10
    )
  );

  if (data.basicInfo.phone.trim()) {
    const phoneReadable =
      phoneInText(data.basicInfo.phone, rawText) ||
      includesFuzzy(parsed.profile.phone, data.basicInfo.phone);
    checks.push(
      check(
        "phone",
        "Phone parsed",
        phoneReadable
          ? "Phone number found in PDF text."
          : "Phone not detected — use a standard format (e.g. +1 555 123 4567).",
        phoneReadable ? "pass" : "warn",
        5
      )
    );
  }

  if (data.basicInfo.summary.trim()) {
    const summaryReadable = includesFuzzy(rawText, data.basicInfo.summary.slice(0, 50));
    const summaryStructured = includesFuzzy(
      parsed.profile.summary,
      data.basicInfo.summary.slice(0, 50)
    );
    checks.push(
      check(
        "summary",
        "Summary parsed",
        summaryStructured
          ? "Parser mapped summary into a profile field."
          : summaryReadable
            ? "Summary text is readable but not isolated by the parser."
            : "Summary may not parse cleanly.",
        summaryStructured ? "pass" : summaryReadable ? "warn" : "fail",
        6
      )
    );
  }

  if (exportExperience) {
    const headingStructured = structuredSectionFound(
      structuredSectionNames,
      "experience"
    );
    const headingHint = keywordHints.some((h) =>
      h.toLowerCase().includes("experience")
    );

    checks.push(
      check(
        "experience-section",
        "Experience section structure",
        headingStructured
          ? "Parser identified an Experience section boundary."
          : headingHint
            ? "“Experience” appears in PDF text but parser couldn't isolate the section — field mapping may fail."
            : "No Experience section detected by parser.",
        headingStructured ? "pass" : headingHint ? "warn" : "fail",
        10
      )
    );

    const expParse = experienceParseCheck(
      rolesParsed,
      rolesInRawText,
      filledExperiences.length
    );
    checks.push(
      check(
        "experience-entries",
        "Work history structured",
        filledExperiences.length === 0
          ? "Add at least one work experience entry — ATS systems expect a work history section."
          : expParse.detail,
        filledExperiences.length === 0 ? "fail" : expParse.status,
        14
      )
    );

    if (filledExperiences.length > 0) {
      const hasDates = parsed.workExperiences.some((exp) => exp.date.trim());
      checks.push(
        check(
          "experience-dates",
          "Experience dates parsed",
          hasDates
            ? "At least one role has dates the parser could extract."
            : "No dates extracted — ATS timeline parsing may fail. Ensure dates are on each role.",
          hasDates ? "pass" : "warn",
          6
        )
      );

      checks.push(
        check(
          "experience-bullets",
          "Bullet accomplishments",
          hasBulletContent(accomplishmentText)
            ? hasBulletContent(
                parsed.workExperiences.flatMap((e) => e.descriptions).join("\n")
              )
              ? "Bullet points parsed into structured descriptions."
              : "Bullets are in PDF text but parser couldn't structure them."
            : "Add bullet-point accomplishments per role for ATS readability.",
          !hasBulletContent(accomplishmentText)
            ? "warn"
            : hasBulletContent(
                  parsed.workExperiences.flatMap((e) => e.descriptions).join("\n")
                )
              ? "pass"
              : "warn",
          6
        )
      );
    }
  } else if (data.visibility.experience) {
    checks.push(
      check(
        "experience-missing",
        "Work history",
        "Experience section is visible but empty — add roles for ATS parsing.",
        "fail",
        14
      )
    );
  }

  if (exportEducation) {
    const headingStructured = structuredSectionFound(
      structuredSectionNames,
      "education"
    );
    checks.push(
      check(
        "education-section",
        "Education section structure",
        headingStructured
          ? "Parser identified an Education section."
          : "Education content exported but parser couldn't isolate the section.",
        headingStructured ? "pass" : "warn",
        6
      )
    );
  } else if (filledEducations.length > 0 && !data.visibility.education) {
    checks.push(
      check(
        "education-hidden",
        "Education hidden",
        "Education entries exist but the section is hidden — not in your PDF export.",
        "warn",
        0
      )
    );
  }

  if (exportSkills) {
    const headingStructured = structuredSectionFound(
      structuredSectionNames,
      "skill"
    );
    const skillsInRaw = visibleSkills.filter((skill) =>
      includesFuzzy(rawText, skill)
    ).length;
    const skillsStructured = visibleSkills.filter((skill) =>
      includesFuzzy(parsed.skills.descriptions.join(" "), skill)
    ).length;

    checks.push(
      check(
        "skills-section",
        "Skills section structure",
        headingStructured
          ? "Parser identified a Skills section."
          : "Skills exported but parser couldn't isolate the section heading.",
        headingStructured ? "pass" : "warn",
        6
      ),
      check(
        "skills-keywords",
        "Skills field mapping",
        visibleSkills.length === 0
          ? "Add skills — ATS keyword matching relies on a dedicated skills section."
          : skillsStructured >= Math.ceil(visibleSkills.length * 0.6)
            ? `${skillsStructured} skills mapped into parser output.`
            : skillsInRaw >= Math.ceil(visibleSkills.length * 0.6)
              ? `${skillsInRaw} skills readable as text but not all mapped to a skills field.`
              : `${skillsInRaw} of ${visibleSkills.length} skills found in PDF text.`,
        visibleSkills.length === 0
          ? "fail"
          : skillsStructured >= Math.ceil(visibleSkills.length * 0.6)
            ? "pass"
            : skillsInRaw >= Math.ceil(visibleSkills.length * 0.5)
              ? "warn"
              : "fail",
        8
      )
    );
  } else if (data.visibility.skill) {
    checks.push(
      check(
        "skills-missing",
        "Skills section",
        "Skills section is visible but empty — add keywords ATS can scan.",
        "fail",
        8
      )
    );
  } else if (visibleSkills.length > 0 && !data.visibility.skill) {
    checks.push(
      check(
        "skills-hidden",
        "Skills hidden",
        "Skills are filled in but the section is hidden — not in your PDF export.",
        "warn",
        0
      )
    );
  }

  if (exportProjects) {
    const headingStructured = structuredSectionFound(
      structuredSectionNames,
      "project"
    );
    checks.push(
      check(
        "projects-section",
        "Projects section structure",
        headingStructured
          ? "Parser identified a Projects section."
          : "Projects exported but section boundary not detected by parser.",
        headingStructured ? "pass" : "warn",
        4
      )
    );
  }

  const parseResult = computeAtsParseRate(data, parsed, structuredSectionNames);

  checks.unshift(
    check(
      "parse-rate",
      "ATS parse rate",
      getAtsParseRateSummary(
        parseResult.parseRate,
        parseResult.parsedCount,
        parseResult.totalCount,
        parseResult.missingRequiredCount
      ),
      parseResult.parseRate >= 85
        ? "pass"
        : parseResult.parseRate >= 55
          ? "warn"
          : "fail",
      0
    )
  );

  if (parseResult.missingRequiredCount > 0) {
    checks.splice(1, 0, check(
      "missing-sections",
      "Required sections missing",
      `${parseResult.missingRequiredCount} ATS-required section${parseResult.missingRequiredCount === 1 ? "" : "s"} not in your PDF — add experience, skills, and other visible sections.`,
      "fail",
      0
    ));
  }

  if (isMultiColumn && parseResult.parseRate < 85) {
    checks.splice(1, 0, check(
      "parse-layout",
      "Layout impact",
      "Two-column layout likely reduced parse rate — ATS parsers read top-to-bottom in a single column.",
      "warn",
      0
    ));
  }

  const unparsedSample = parseResult.fields
    .filter((field) => !field.parsed)
    .slice(0, 5)
    .map((field) => field.label);

  if (unparsedSample.length > 0 && parseResult.parseRate < 100) {
    checks.push(
      check(
        "unparsed-fields",
        "Unparsed fields",
        `Parser missed: ${unparsedSample.join(", ")}${parseResult.fields.filter((f) => !f.parsed).length > 5 ? "…" : ""}.`,
        "warn",
        0
      )
    );
  }

  return {
    score: parseResult.parseRate,
    parseRate: parseResult.parseRate,
    parsedFieldCount: parseResult.parsedCount,
    totalFieldCount: parseResult.totalCount,
    missingRequiredCount: parseResult.missingRequiredCount,
    checks,
    passCount: checks.filter((c) => c.status === "pass").length,
    warnCount: checks.filter((c) => c.status === "warn").length,
    failCount: checks.filter((c) => c.status === "fail").length,
    parsed,
    textItemCount: textItems.length,
    sectionNames: structuredSectionNames,
    isMultiColumn,
  };
}
