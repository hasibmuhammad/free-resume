import { sectionHasPdfContent } from "@/lib/pdf/buildResumePdfData";
import { ResumePdfData } from "@/lib/pdf/types";
import {
  isEducationFilled,
  isExperienceFilled,
  isProjectFilled,
} from "@/lib/resumeContent";
import { ParsedResume } from "@/types/parsedResume";
import {
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "@/types/resume";

export interface ParseFieldResult {
  id: string;
  label: string;
  category: "contact" | "experience" | "education" | "skills" | "projects";
  parsed: boolean;
}

export interface AtsParseRateResult {
  parseRate: number;
  parsedCount: number;
  totalCount: number;
  missingRequiredCount: number;
  fields: ParseFieldResult[];
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function splitBulletLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter((line) => line.length >= 8);
}

function structuredSectionFound(
  sectionNames: string[],
  keyword: string,
  keywordHints: string[] = []
): boolean {
  if (sectionNames.some((name) => normalize(name).includes(keyword))) {
    return true;
  }
  return keywordHints.some((name) => normalize(name).includes(keyword));
}

function fieldReadable(
  structuredMatch: boolean,
  rawText: string | undefined,
  needle: string
): boolean {
  if (structuredMatch) return true;
  if (!rawText || needle.trim().length < 4) return false;
  return includesFuzzy(rawText, needle.slice(0, Math.min(needle.length, 48)));
}

function roleReadableInRaw(
  exp: ExperienceItem,
  rawText: string | undefined
): boolean {
  if (!rawText) return false;
  return (
    includesFuzzy(rawText, exp.jobTitle) || includesFuzzy(rawText, exp.companyName)
  );
}

function projectReadableInRaw(
  project: ProjectItem,
  rawText: string | undefined
): boolean {
  if (!rawText) return false;
  return includesFuzzy(rawText, project.projectTitle);
}

function educationReadableInRaw(
  edu: EducationItem,
  rawText: string | undefined
): boolean {
  if (!rawText) return false;
  return (
    includesFuzzy(rawText, edu.degree) || includesFuzzy(rawText, edu.institute)
  );
}

function findParsedExperience(
  exp: ExperienceItem,
  parsed: ParsedResume,
  used: Set<number>
) {
  for (let i = 0; i < parsed.workExperiences.length; i++) {
    if (used.has(i)) continue;
    const role = parsed.workExperiences[i];
    if (
      includesFuzzy(role.jobTitle, exp.jobTitle) ||
      includesFuzzy(role.company, exp.companyName)
    ) {
      used.add(i);
      return role;
    }
  }
  return undefined;
}

function findParsedEducation(
  edu: EducationItem,
  parsed: ParsedResume,
  used: Set<number>
) {
  for (let i = 0; i < parsed.educations.length; i++) {
    if (used.has(i)) continue;
    const entry = parsed.educations[i];
    if (
      includesFuzzy(entry.degree, edu.degree) ||
      includesFuzzy(entry.school, edu.institute)
    ) {
      used.add(i);
      return entry;
    }
  }
  return undefined;
}

function findParsedProject(
  project: ProjectItem,
  parsed: ParsedResume,
  used: Set<number>
) {
  for (let i = 0; i < parsed.projects.length; i++) {
    if (used.has(i)) continue;
    const entry = parsed.projects[i];
    if (includesFuzzy(entry.project, project.projectTitle)) {
      used.add(i);
      return entry;
    }
  }
  return undefined;
}

function addField(
  fields: ParseFieldResult[],
  field: ParseFieldResult
): void {
  fields.push(field);
}

/** ATS must-haves — counted as unparsed when missing from the PDF export. */
function addRequiredAtsFields(
  data: ResumePdfData,
  fields: ParseFieldResult[]
): number {
  let missing = 0;
  const { basicInfo } = data;

  if (!basicInfo.fullName.trim()) {
    addField(fields, {
      id: "req-name",
      label: "Name (required)",
      category: "contact",
      parsed: false,
    });
    missing += 1;
  }

  if (!basicInfo.email.trim()) {
    addField(fields, {
      id: "req-email",
      label: "Email (required)",
      category: "contact",
      parsed: false,
    });
    missing += 1;
  }

  const alwaysRequiredSections: {
    key: "experience" | "skill";
    label: string;
    category: ParseFieldResult["category"];
  }[] = [
    {
      key: "experience",
      label: "Work experience (required)",
      category: "experience",
    },
    {
      key: "skill",
      label: "Skills section (required)",
      category: "skills",
    },
  ];

  for (const { key, label, category } of alwaysRequiredSections) {
    if (!sectionHasPdfContent(key, data)) {
      addField(fields, {
        id: `req-${key}`,
        label,
        category,
        parsed: false,
      });
      missing += 1;
    }
  }

  const whenVisibleSections: {
    key: "education" | "project";
    label: string;
    category: ParseFieldResult["category"];
  }[] = [
    {
      key: "education",
      label: "Education section",
      category: "education",
    },
    {
      key: "project",
      label: "Projects section",
      category: "projects",
    },
  ];

  for (const { key, label, category } of whenVisibleSections) {
    if (data.visibility[key] && !sectionHasPdfContent(key, data)) {
      addField(fields, {
        id: `req-${key}`,
        label,
        category,
        parsed: false,
      });
      missing += 1;
    }
  }

  return missing;
}

export function computeAtsParseRate(
  data: ResumePdfData,
  parsed: ParsedResume,
  structuredSectionNames: string[],
  options: {
    rawText?: string;
    keywordHints?: string[];
    isMultiColumn?: boolean;
  } = {}
): AtsParseRateResult {
  const { rawText, keywordHints = [], isMultiColumn = false } = options;
  const useRawFallback = isMultiColumn || Boolean(rawText);
  const fields: ParseFieldResult[] = [];
  const { basicInfo } = data;

  if (basicInfo.fullName.trim()) {
    addField(fields, {
      id: "contact-name",
      label: "Name",
      category: "contact",
      parsed: fieldReadable(
        includesFuzzy(parsed.profile.name, basicInfo.fullName),
        rawText,
        basicInfo.fullName
      ),
    });
  }

  if (basicInfo.email.trim()) {
    addField(fields, {
      id: "contact-email",
      label: "Email",
      category: "contact",
      parsed: fieldReadable(
        isValidEmail(parsed.profile.email) &&
          includesFuzzy(parsed.profile.email, basicInfo.email),
        rawText,
        basicInfo.email
      ),
    });
  }

  if (basicInfo.phone.trim()) {
    addField(fields, {
      id: "contact-phone",
      label: "Phone",
      category: "contact",
      parsed: fieldReadable(
        includesFuzzy(parsed.profile.phone, basicInfo.phone),
        rawText,
        basicInfo.phone
      ),
    });
  }

  if (basicInfo.location.trim()) {
    addField(fields, {
      id: "contact-location",
      label: "Location",
      category: "contact",
      parsed: fieldReadable(
        includesFuzzy(parsed.profile.location, basicInfo.location),
        rawText,
        basicInfo.location
      ),
    });
  }

  if (basicInfo.summary.trim()) {
    addField(fields, {
      id: "contact-summary",
      label: "Summary",
      category: "contact",
      parsed: fieldReadable(
        includesFuzzy(parsed.profile.summary, basicInfo.summary.slice(0, 50)),
        rawText,
        basicInfo.summary.slice(0, 50)
      ),
    });
  }

  if (basicInfo.designation.trim()) {
    addField(fields, {
      id: "contact-designation",
      label: "Job title / headline",
      category: "contact",
      parsed: fieldReadable(
        includesFuzzy(parsed.profile.name, basicInfo.designation) ||
          includesFuzzy(parsed.profile.summary, basicInfo.designation),
        rawText,
        basicInfo.designation
      ),
    });
  }

  if (sectionHasPdfContent("experience", data)) {
    const filled = data.experiences.filter(isExperienceFilled);

    addField(fields, {
      id: "experience-heading",
      label: "Experience section",
      category: "experience",
      parsed: structuredSectionFound(
        structuredSectionNames,
        "experience",
        keywordHints
      ),
    });

    const usedRoles = new Set<number>();
    filled.forEach((exp, index) => {
      let parsedRole = findParsedExperience(exp, parsed, usedRoles);
      if (!parsedRole && useRawFallback && roleReadableInRaw(exp, rawText)) {
        parsedRole = {
          company: exp.companyName,
          jobTitle: exp.jobTitle,
          date: "",
          descriptions: splitBulletLines(exp.accomplishments),
        };
      }

      const prefix = `experience-${index}`;

      addField(fields, {
        id: `${prefix}-title`,
        label: `Role ${index + 1} job title`,
        category: "experience",
        parsed: fieldReadable(
          Boolean(parsedRole && includesFuzzy(parsedRole.jobTitle, exp.jobTitle)),
          rawText,
          exp.jobTitle
        ),
      });

      addField(fields, {
        id: `${prefix}-company`,
        label: `Role ${index + 1} company`,
        category: "experience",
        parsed: fieldReadable(
          Boolean(parsedRole && includesFuzzy(parsedRole.company, exp.companyName)),
          rawText,
          exp.companyName
        ),
      });

      const hasDates = Boolean(exp.startDate?.startDate);
      if (hasDates) {
        addField(fields, {
          id: `${prefix}-dates`,
          label: `Role ${index + 1} dates`,
          category: "experience",
          parsed: Boolean(parsedRole?.date.trim()) || Boolean(rawText && /\d{4}/.test(rawText)),
        });
      }

      const bullets = splitBulletLines(exp.accomplishments);
      bullets.forEach((bullet, bulletIndex) => {
        const descriptions = parsedRole?.descriptions ?? [];
        addField(fields, {
          id: `${prefix}-bullet-${bulletIndex}`,
          label: `Role ${index + 1} bullet ${bulletIndex + 1}`,
          category: "experience",
          parsed: fieldReadable(
            includesFuzzy(descriptions.join(" "), bullet.slice(0, 40)),
            rawText,
            bullet
          ),
        });
      });
    });
  }

  if (sectionHasPdfContent("education", data)) {
    const filled = data.educations.filter(isEducationFilled);

    addField(fields, {
      id: "education-heading",
      label: "Education section",
      category: "education",
      parsed: structuredSectionFound(
        structuredSectionNames,
        "education",
        keywordHints
      ),
    });

    const usedEntries = new Set<number>();
    filled.forEach((edu, index) => {
      let parsedEdu = findParsedEducation(edu, parsed, usedEntries);
      if (!parsedEdu && useRawFallback && educationReadableInRaw(edu, rawText)) {
        parsedEdu = {
          school: edu.institute,
          degree: edu.degree,
          date: "",
          gpa: edu.gpa,
          descriptions: [],
        };
      }

      const prefix = `education-${index}`;

      addField(fields, {
        id: `${prefix}-degree`,
        label: `Education ${index + 1} degree`,
        category: "education",
        parsed: fieldReadable(
          Boolean(parsedEdu && includesFuzzy(parsedEdu.degree, edu.degree)),
          rawText,
          edu.degree
        ),
      });

      addField(fields, {
        id: `${prefix}-school`,
        label: `Education ${index + 1} school`,
        category: "education",
        parsed: fieldReadable(
          Boolean(parsedEdu && includesFuzzy(parsedEdu.school, edu.institute)),
          rawText,
          edu.institute
        ),
      });

      if (edu.startDate?.startDate) {
        addField(fields, {
          id: `${prefix}-dates`,
          label: `Education ${index + 1} dates`,
          category: "education",
          parsed: Boolean(parsedEdu?.date.trim()),
        });
      }

      const bullets = splitBulletLines(edu.achievements);
      bullets.forEach((bullet, bulletIndex) => {
        const descriptions = parsedEdu?.descriptions ?? [];
        addField(fields, {
          id: `${prefix}-bullet-${bulletIndex}`,
          label: `Education ${index + 1} achievement ${bulletIndex + 1}`,
          category: "education",
          parsed: fieldReadable(
            includesFuzzy(descriptions.join(" "), bullet.slice(0, 40)),
            rawText,
            bullet
          ),
        });
      });
    });
  }

  if (sectionHasPdfContent("skill", data)) {
    const skills = data.skills.filter((skill) => skill.trim() !== "");

    addField(fields, {
      id: "skills-heading",
      label: "Skills section",
      category: "skills",
      parsed: structuredSectionFound(
        structuredSectionNames,
        "skill",
        keywordHints
      ),
    });

    const skillsBlob = [
      ...parsed.skills.descriptions,
      ...parsed.skills.featuredSkills.map((s) => s.skill),
    ].join(" ");

    skills.forEach((skill, index) => {
      addField(fields, {
        id: `skill-${index}`,
        label: skill,
        category: "skills",
        parsed: fieldReadable(includesFuzzy(skillsBlob, skill), rawText, skill),
      });
    });
  }

  if (sectionHasPdfContent("project", data)) {
    const filled = data.projects.filter(isProjectFilled);

    addField(fields, {
      id: "projects-heading",
      label: "Projects section",
      category: "projects",
      parsed: structuredSectionFound(
        structuredSectionNames,
        "project",
        keywordHints
      ),
    });

    const usedProjects = new Set<number>();
    filled.forEach((project, index) => {
      let parsedProject = findParsedProject(project, parsed, usedProjects);
      if (
        !parsedProject &&
        useRawFallback &&
        projectReadableInRaw(project, rawText)
      ) {
        parsedProject = {
          project: project.projectTitle,
          date: "",
          descriptions: splitBulletLines(project.keyFeatures),
        };
      }

      const prefix = `project-${index}`;

      addField(fields, {
        id: `${prefix}-title`,
        label: `Project ${index + 1} title`,
        category: "projects",
        parsed: fieldReadable(
          Boolean(
            parsedProject &&
              includesFuzzy(parsedProject.project, project.projectTitle)
          ),
          rawText,
          project.projectTitle
        ),
      });

      const bullets = splitBulletLines(project.keyFeatures);
      bullets.forEach((bullet, bulletIndex) => {
        addField(fields, {
          id: `${prefix}-bullet-${bulletIndex}`,
          label: `Project ${index + 1} bullet ${bulletIndex + 1}`,
          category: "projects",
          parsed: fieldReadable(
            includesFuzzy(
              (parsedProject?.descriptions ?? []).join(" "),
              bullet.slice(0, 40)
            ),
            rawText,
            bullet
          ),
        });
      });
    });
  }

  const missingRequiredCount = addRequiredAtsFields(data, fields);

  const parsedCount = fields.filter((field) => field.parsed).length;
  const totalCount = fields.length;
  const parseRate =
    totalCount > 0 ? Math.round((parsedCount / totalCount) * 100) : 0;

  return { parseRate, parsedCount, totalCount, missingRequiredCount, fields };
}
