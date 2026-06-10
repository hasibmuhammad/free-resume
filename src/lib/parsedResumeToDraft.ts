import moment from "moment";
import { DEFAULT_SECTION_ORDER, SECTION_REGISTRY } from "@/lib/sectionConfig";
import { DEFAULT_TEMPLATE_ID } from "@/lib/templates/registry";
import {
  ParsedResume,
  ResumeSkills,
} from "@/types/parsedResume";
import {
  BasicInfo,
  EducationItem,
  EMPTY_DATE,
  ExperienceItem,
  ProjectItem,
  SectionKey,
} from "@/types/resume";
import {
  RESUME_DRAFT_VERSION,
  ResumeDraft,
} from "@/types/resumeDraft";
import { DateValueType } from "react-tailwindcss-datepicker";
import { normalizeDateValue } from "@/lib/dateValue";
import { normalizeEducationDegreeGpa } from "@/lib/format";

const DATE_FORMATS = [
  "MMM YYYY",
  "MMMM YYYY",
  "MM/YYYY",
  "M/YYYY",
  "YYYY",
  "MM-YYYY",
  "M-YYYY",
  "MM/YY",
  "M/YY",
];

function parseSingleDate(token: string): Date | null {
  const trimmed = token
    .trim()
    .replace(/\.$/, "")
    .replace(/['']/g, "");
  if (!trimmed || /\b(present|current|now)\b/i.test(trimmed)) return null;

  for (const format of DATE_FORMATS) {
    const parsed = moment(trimmed, format, true);
    if (parsed.isValid()) return parsed.toDate();
  }

  const loose = moment(
    trimmed,
    ["MMM YYYY", "MMMM YYYY", "M/YYYY", "MM/YYYY", "M-YYYY", "MM-YYYY", "YYYY"],
    false
  );
  if (loose.isValid()) return loose.toDate();

  return null;
}

function toDateValue(date: Date | null): DateValueType {
  return normalizeDateValue(date ? { startDate: date, endDate: null } : null);
}

function parseDateRange(dateStr: string): {
  startDate: DateValueType;
  endDate: DateValueType;
  isCurrent: boolean;
} {
  const normalized = dateStr.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return { startDate: EMPTY_DATE, endDate: EMPTY_DATE, isCurrent: false };
  }

  const isCurrent = /\b(present|current|now)\b/i.test(normalized);
  const parts = normalized.split(/\s*[–—-]\s*|\s+to\s+/i);
  const start = parts[0] ? parseSingleDate(parts[0]) : null;
  const endToken = parts[1]?.trim() ?? "";

  const end =
    endToken && !/\b(present|current|now)\b/i.test(endToken)
      ? parseSingleDate(endToken)
      : null;

  return {
    startDate: toDateValue(start),
    endDate: toDateValue(end),
    isCurrent,
  };
}

function descriptionsToText(descriptions: string[]): string {
  return descriptions
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean)
    .join("\n");
}

function resolveProfileSocialUrls(
  profile: ParsedResume["profile"]
): Pick<BasicInfo, "linkedin" | "github"> {
  const fromUrl = splitProfileUrls(profile.url);

  return {
    linkedin: profile.linkedin?.trim() || fromUrl.linkedin,
    github: profile.github?.trim() || fromUrl.github,
  };
}

function splitProfileUrls(url: string): Pick<BasicInfo, "linkedin" | "github"> {
  const trimmed = url.trim();
  if (!trimmed) return { linkedin: "", github: "" };

  const lower = trimmed.toLowerCase();
  if (lower.includes("linkedin.com")) {
    return { linkedin: trimmed, github: "" };
  }
  if (lower.includes("github.com")) {
    return { linkedin: "", github: trimmed };
  }

  return { linkedin: "", github: "" };
}

function extractSkillsList(skills: ResumeSkills): string[] {
  const fromFeatured = skills.featuredSkills
    .map((entry) => entry.skill.trim())
    .filter(Boolean);
  const fromDescriptions = skills.descriptions.flatMap((line) =>
    line
      .split(/[,|•·]/)
      .map((part) => part.trim())
      .filter((part) => part.length > 0 && part.length < 60)
  );

  return [...new Set([...fromFeatured, ...fromDescriptions])];
}

function emptyExperience(): ExperienceItem {
  return {
    companyName: "",
    jobTitle: "",
    location: "",
    currentlyWorking: false,
    startDate: EMPTY_DATE,
    endDate: EMPTY_DATE,
    accomplishments: "",
  };
}

function emptyEducation(): EducationItem {
  return {
    degree: "",
    gpa: "",
    institute: "",
    currentlyTaking: false,
    startDate: EMPTY_DATE,
    endDate: EMPTY_DATE,
    achievements: "",
  };
}

function emptyProject(): ProjectItem {
  return {
    projectTitle: "",
    currentlyWorking: false,
    startDate: EMPTY_DATE,
    endDate: EMPTY_DATE,
    keyFeatures: "",
  };
}

function sectionVisibility(parsed: ParsedResume): Record<SectionKey, boolean> {
  return {
    experience: parsed.workExperiences.some(
      (entry) => entry.jobTitle.trim() || entry.company.trim()
    ),
    education: parsed.educations.some(
      (entry) => entry.degree.trim() || entry.school.trim()
    ),
    skill: extractSkillsList(parsed.skills).length > 0,
    project: parsed.projects.some((entry) => entry.project.trim()),
  };
}

export function parsedResumeToDraft(parsed: ParsedResume): ResumeDraft {
  const { profile } = parsed;
  const profileUrls = resolveProfileSocialUrls(profile);
  const experiences = parsed.workExperiences
    .filter((entry) => entry.jobTitle.trim() || entry.company.trim())
    .map((entry) => {
      const dates = parseDateRange(entry.date);
      return {
        companyName: entry.company.trim(),
        jobTitle: entry.jobTitle.trim(),
        location: "",
        currentlyWorking: dates.isCurrent,
        startDate: dates.startDate,
        endDate: dates.endDate,
        accomplishments: descriptionsToText(entry.descriptions),
      };
    });

  const educations = parsed.educations
    .filter((entry) => entry.degree.trim() || entry.school.trim())
    .map((entry) => {
      const dates = parseDateRange(entry.date);
      const { degree, gpa } = normalizeEducationDegreeGpa(
        entry.degree,
        entry.gpa
      );
      return {
        degree,
        gpa,
        institute: entry.school.trim(),
        currentlyTaking: dates.isCurrent,
        startDate: dates.startDate,
        endDate: dates.endDate,
        achievements: descriptionsToText(entry.descriptions),
      };
    });

  const projects = parsed.projects
    .filter((entry) => entry.project.trim())
    .map((entry) => {
      const dates = parseDateRange(entry.date);
      return {
        projectTitle: entry.project.trim(),
        currentlyWorking: dates.isCurrent,
        startDate: dates.startDate,
        endDate: dates.endDate,
        keyFeatures: descriptionsToText(entry.descriptions),
      };
    });

  const skills = extractSkillsList(parsed.skills);
  const designation =
    experiences[0]?.jobTitle.trim() || profile.summary.split(".")[0]?.trim() || "";

  return {
    version: RESUME_DRAFT_VERSION,
    savedAt: new Date().toISOString(),
    templateId: DEFAULT_TEMPLATE_ID,
    themeCustomization: {},
    basicInfo: {
      fullName: profile.name.trim(),
      designation,
      location: profile.location.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      summary: profile.summary.trim(),
      ...profileUrls,
    },
    experience: {
      experiences: experiences.length > 0 ? experiences : [emptyExperience()],
    },
    education: {
      educations: educations.length > 0 ? educations : [emptyEducation()],
    },
    project: {
      projects: projects.length > 0 ? projects : [emptyProject()],
    },
    skill: {
      skills: skills.length > 0 ? skills : [""],
    },
    sections: {
      sections: DEFAULT_SECTION_ORDER.map((key) => ({
        key,
        ...SECTION_REGISTRY[key],
      })),
      visibility: sectionVisibility(parsed),
    },
  };
}
