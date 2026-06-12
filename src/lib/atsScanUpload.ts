import { parseResumeFromPdfBlob } from "@/lib/parse-resume-from-pdf";
import { ParsedResume } from "@/types/parsedResume";
import { AtsCheck, AtsCheckStatus, AtsCheckCategory } from "@/lib/atsScore";

export interface UploadedScanReport {
  /** Weighted 0–100 score across all checks. */
  score: number;
  fileName: string;
  wordCount: number;
  checks: AtsCheck[];
  passCount: number;
  warnCount: number;
  failCount: number;
  parsed: ParsedResume;
  isMultiColumn: boolean;
  detectedSections: string[];
}

const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE_REGEX = /(?:\+?\d[\d\s().-]{7,}\d)/;
const URL_REGEX = /(?:linkedin\.com|github\.com|https?:\/\/|www\.)[^\s]*/i;

/** Common resume action verbs — used to gauge bullet writing quality. */
const ACTION_VERBS = new Set([
  "achieved", "analyzed", "architected", "automated", "built", "collaborated",
  "created", "decreased", "delivered", "designed", "developed", "directed",
  "drove", "engineered", "established", "expanded", "generated", "implemented",
  "improved", "increased", "initiated", "launched", "led", "managed",
  "mentored", "optimized", "orchestrated", "owned", "partnered", "presented",
  "reduced", "redesigned", "refactored", "resolved", "scaled", "shipped",
  "spearheaded", "streamlined", "transformed", "won",
]);

function makeCheck(
  id: string,
  category: AtsCheckCategory,
  label: string,
  detail: string,
  status: AtsCheckStatus,
  weight: number
): AtsCheck {
  return { id, category, label, detail, status, weight };
}

function scoreFromChecks(checks: AtsCheck[]): number {
  const weighted = checks.filter((check) => check.weight > 0);
  const total = weighted.reduce((sum, check) => sum + check.weight, 0);
  if (total === 0) return 0;

  const earned = weighted.reduce((sum, check) => {
    if (check.status === "pass") return sum + check.weight;
    if (check.status === "warn") return sum + check.weight * 0.5;
    return sum;
  }, 0);

  return Math.round((earned / total) * 100);
}

export async function scanUploadedResume(
  file: File
): Promise<UploadedScanReport> {
  if (
    file.type !== "application/pdf" &&
    !file.name.toLowerCase().endsWith(".pdf")
  ) {
    throw new Error("Please upload a PDF file.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("PDF must be smaller than 10 MB.");
  }

  const { resume: parsed, textItems, structuredSectionNames, isMultiColumn } =
    await parseResumeFromPdfBlob(file);

  const rawText = textItems.map((item) => item.text).join(" ");
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;

  const allBullets = [
    ...parsed.workExperiences.flatMap((exp) => exp.descriptions),
    ...parsed.projects.flatMap((project) => project.descriptions),
  ].filter((line) => line.trim());

  const structuredRoles = parsed.workExperiences.filter(
    (exp) => exp.jobTitle.trim() || exp.company.trim()
  );
  const rolesWithDates = parsed.workExperiences.filter((exp) =>
    exp.date.trim()
  );
  const skills = [
    ...parsed.skills.descriptions,
    ...parsed.skills.featuredSkills.map((s) => s.skill),
  ]
    .flatMap((entry) => entry.split(/[,•|]/))
    .map((s) => s.trim())
    .filter(Boolean);

  const quantifiedBullets = allBullets.filter((line) => /\d/.test(line));
  const verbBullets = allBullets.filter((line) => {
    const firstWord = line.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "");
    return firstWord ? ACTION_VERBS.has(firstWord) : false;
  });

  const hasSection = (keyword: string) =>
    structuredSectionNames.some((name) =>
      name.toLowerCase().includes(keyword)
    );

  const checks: AtsCheck[] = [];

  // ---- Format & parsing ----
  checks.push(
    makeCheck(
      "scan-text-layer",
      "format",
      "Machine-readable text",
      textItems.length > 20
        ? `${textItems.length} text elements extracted — the PDF has a real text layer.`
        : "Almost no selectable text found. Scanned-image PDFs are rejected by most ATS platforms — re-export from a word processor or builder.",
      textItems.length > 20 ? "pass" : "fail",
      14
    ),
    makeCheck(
      "scan-layout",
      "format",
      isMultiColumn ? "Multi-column layout" : "Single-column layout",
      isMultiColumn
        ? "Multi-column layout detected. Modern ATS platforms handle this, but strict parsers may misorder content. Verify section detection below."
        : "Single-column reading order — the safest structure for automated parsing.",
      isMultiColumn ? "warn" : "pass",
      8
    ),
    makeCheck(
      "scan-length",
      "format",
      "Resume length",
      wordCount < 200
        ? `Only ~${wordCount} words. Recruiters and ATS ranking favor 400–800 words — add detail to your experience.`
        : wordCount > 1100
          ? `~${wordCount} words is on the long side. Consider trimming to the most relevant 1–2 pages.`
          : `~${wordCount} words — within the typical 400–800 word range recruiters expect.`,
      wordCount < 200 ? "fail" : wordCount < 350 || wordCount > 1100 ? "warn" : "pass",
      6
    )
  );

  // ---- Contact information ----
  const nameDetected = parsed.profile.name.trim().length > 1;
  const emailDetected =
    EMAIL_REGEX.test(parsed.profile.email) || EMAIL_REGEX.test(rawText);
  const phoneDetected =
    parsed.profile.phone.trim().length >= 7 || PHONE_REGEX.test(rawText);
  const linkDetected =
    Boolean(parsed.profile.linkedin || parsed.profile.github || parsed.profile.url) ||
    URL_REGEX.test(rawText);

  checks.push(
    makeCheck(
      "scan-name",
      "contact",
      "Name detected",
      nameDetected
        ? `Parser identified “${parsed.profile.name.trim()}” as the candidate name.`
        : "Couldn't isolate a candidate name. Put your full name on its own line at the top, in the largest font.",
      nameDetected ? "pass" : "fail",
      10
    ),
    makeCheck(
      "scan-email",
      "contact",
      "Email address",
      emailDetected
        ? "Email address found — ATS contact extraction will work."
        : "No email address detected. This is the #1 reason applications get silently dropped.",
      emailDetected ? "pass" : "fail",
      10
    ),
    makeCheck(
      "scan-phone",
      "contact",
      "Phone number",
      phoneDetected
        ? "Phone number found in the document."
        : "No phone number detected. Use a standard format like +1 555 123 4567.",
      phoneDetected ? "pass" : "warn",
      6
    ),
    makeCheck(
      "scan-links",
      "contact",
      "LinkedIn / portfolio link",
      linkDetected
        ? "Professional link found (LinkedIn, GitHub, or portfolio)."
        : "No LinkedIn or portfolio URL found — 76% of recruiters check LinkedIn before an interview.",
      linkDetected ? "pass" : "warn",
      4
    )
  );

  // ---- Section structure ----
  checks.push(
    makeCheck(
      "scan-experience-section",
      "sections",
      "Experience section",
      hasSection("experience") || structuredRoles.length > 0
        ? "Work experience section detected with a standard heading."
        : "No experience section found. Use the conventional heading “Experience” or “Work Experience”.",
      hasSection("experience") || structuredRoles.length > 0 ? "pass" : "fail",
      12
    ),
    makeCheck(
      "scan-education-section",
      "sections",
      "Education section",
      hasSection("education") || parsed.educations.length > 0
        ? "Education section detected."
        : "No education section found — most ATS templates expect one.",
      hasSection("education") || parsed.educations.length > 0 ? "pass" : "warn",
      6
    ),
    makeCheck(
      "scan-skills-section",
      "sections",
      "Skills section",
      hasSection("skill") || skills.length > 0
        ? "Skills section detected — keyword matching depends on this."
        : "No dedicated skills section. ATS keyword filters rely on it heavily — add one.",
      hasSection("skill") || skills.length > 0 ? "pass" : "fail",
      10
    ),
    makeCheck(
      "scan-summary",
      "sections",
      "Professional summary",
      parsed.profile.summary.trim()
        ? "Summary/objective detected near the top."
        : "No summary found. A 2–3 line summary helps both recruiters and ATS relevance ranking.",
      parsed.profile.summary.trim() ? "pass" : "warn",
      4
    )
  );

  // ---- Content quality ----
  checks.push(
    makeCheck(
      "scan-roles",
      "content",
      "Structured work history",
      structuredRoles.length >= 2
        ? `${structuredRoles.length} roles parsed with job title/company fields.`
        : structuredRoles.length === 1
          ? "Only 1 role could be structured. If you have more, check date and title formatting per entry."
          : "No roles could be structured into title + company + dates — ATS work-history mapping will fail.",
      structuredRoles.length >= 2 ? "pass" : structuredRoles.length === 1 ? "warn" : "fail",
      12
    ),
    makeCheck(
      "scan-dates",
      "content",
      "Employment dates",
      rolesWithDates.length > 0
        ? `Dates parsed on ${rolesWithDates.length} role${rolesWithDates.length === 1 ? "" : "s"} — timeline extraction works.`
        : "No employment dates detected. Use formats like “Jan 2021 – Present” on every role.",
      rolesWithDates.length > 0 ? "pass" : "fail",
      8
    ),
    makeCheck(
      "scan-bullets",
      "content",
      "Bullet-point accomplishments",
      allBullets.length >= 6
        ? `${allBullets.length} bullet points parsed across roles and projects.`
        : allBullets.length > 0
          ? `Only ${allBullets.length} bullet points found — aim for 3–5 per recent role.`
          : "No bullet points detected. Dense paragraphs hurt both ATS parsing and recruiter skim-reading.",
      allBullets.length >= 6 ? "pass" : allBullets.length > 0 ? "warn" : "fail",
      8
    ),
    makeCheck(
      "scan-quantified",
      "content",
      "Quantified impact",
      allBullets.length === 0
        ? "Add bullets first, then quantify them with numbers (%, $, time saved)."
        : quantifiedBullets.length / allBullets.length >= 0.3
          ? `${quantifiedBullets.length} of ${allBullets.length} bullets include numbers — strong, measurable impact.`
          : `Only ${quantifiedBullets.length} of ${allBullets.length} bullets contain numbers. Quantified bullets ("increased X by 40%") rank higher with recruiters.`,
      allBullets.length === 0
        ? "warn"
        : quantifiedBullets.length / allBullets.length >= 0.3
          ? "pass"
          : "warn",
      6
    ),
    makeCheck(
      "scan-verbs",
      "content",
      "Action verbs",
      allBullets.length === 0
        ? "No bullets to evaluate."
        : verbBullets.length / allBullets.length >= 0.4
          ? `${verbBullets.length} of ${allBullets.length} bullets start with strong action verbs.`
          : `Only ${verbBullets.length} of ${allBullets.length} bullets start with action verbs (led, built, increased…). Weak openers get skimmed past.`,
      allBullets.length === 0
        ? "warn"
        : verbBullets.length / allBullets.length >= 0.4
          ? "pass"
          : "warn",
      5
    ),
    makeCheck(
      "scan-skill-count",
      "content",
      "Skills keyword coverage",
      skills.length >= 6
        ? `${skills.length} distinct skills parsed — good keyword surface for ATS matching.`
        : skills.length > 0
          ? `Only ${skills.length} skills parsed. List 8–15 relevant skills to maximize keyword matches.`
          : "No skills parsed — keyword filters will score this resume near zero.",
      skills.length >= 6 ? "pass" : skills.length > 0 ? "warn" : "fail",
      8
    )
  );

  return {
    score: scoreFromChecks(checks),
    fileName: file.name,
    wordCount,
    checks,
    passCount: checks.filter((c) => c.status === "pass").length,
    warnCount: checks.filter((c) => c.status === "warn").length,
    failCount: checks.filter((c) => c.status === "fail").length,
    parsed,
    isMultiColumn,
    detectedSections: structuredSectionNames,
  };
}
