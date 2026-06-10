import type {
  ParsedResume,
  ResumeEducation,
  ResumeProject,
  ResumeWorkExperience,
} from "@/types/parsedResume";

function normalizeKey(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function mergeProfile(
  a: ParsedResume["profile"],
  b: ParsedResume["profile"]
): ParsedResume["profile"] {
  return {
    name: a.name.trim() || b.name.trim(),
    email: a.email.trim() || b.email.trim(),
    phone: a.phone.trim() || b.phone.trim(),
    url: a.url.trim() || b.url.trim(),
    github: a.github.trim() || b.github.trim(),
    linkedin: a.linkedin.trim() || b.linkedin.trim(),
    summary: a.summary.trim() || b.summary.trim(),
    location: a.location.trim() || b.location.trim(),
  };
}

function dedupeExperiences(
  items: ResumeWorkExperience[]
): ResumeWorkExperience[] {
  const seen = new Set<string>();
  const result: ResumeWorkExperience[] = [];

  for (const item of items) {
    const key = normalizeKey(`${item.company}|${item.jobTitle}|${item.date}`);
    if (!key.replace(/\|/g, "").trim()) continue;
    if (seen.has(key)) {
      const existing = result.find(
        (entry) =>
          normalizeKey(`${entry.company}|${entry.jobTitle}|${entry.date}`) === key
      );
      if (existing) {
        existing.descriptions = [
          ...existing.descriptions,
          ...item.descriptions.filter(
            (desc) =>
              !existing.descriptions.some(
                (existingDesc) =>
                  normalizeKey(existingDesc) === normalizeKey(desc)
              )
          ),
        ];
      }
      continue;
    }
    seen.add(key);
    result.push({ ...item, descriptions: [...item.descriptions] });
  }

  return result;
}

function dedupeEducation(items: ResumeEducation[]): ResumeEducation[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeKey(`${item.school}|${item.degree}`);
    if (!key.replace(/\|/g, "").trim() || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function dedupeProjects(items: ResumeProject[]): ResumeProject[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeKey(item.project);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeSkills(
  a: ParsedResume["skills"],
  b: ParsedResume["skills"]
): ParsedResume["skills"] {
  const featured = [...a.featuredSkills];
  const featuredKeys = new Set(featured.map((s) => normalizeKey(s.skill)));

  for (const skill of b.featuredSkills) {
    const key = normalizeKey(skill.skill);
    if (key && !featuredKeys.has(key)) {
      featured.push(skill);
      featuredKeys.add(key);
    }
  }

  const descriptions = [...a.descriptions];
  for (const desc of b.descriptions) {
    if (
      !descriptions.some(
        (existing) => normalizeKey(existing) === normalizeKey(desc)
      )
    ) {
      descriptions.push(desc);
    }
  }

  return { featuredSkills: featured, descriptions };
}

export function mergeParsedResumes(
  primary: ParsedResume,
  secondary: ParsedResume
): ParsedResume {
  return {
    profile: mergeProfile(primary.profile, secondary.profile),
    workExperiences: dedupeExperiences([
      ...primary.workExperiences,
      ...secondary.workExperiences,
    ]),
    educations: dedupeEducation([
      ...primary.educations,
      ...secondary.educations,
    ]),
    projects: dedupeProjects([...primary.projects, ...secondary.projects]),
    skills: mergeSkills(primary.skills, secondary.skills),
    custom: {
      descriptions: [
        ...primary.custom.descriptions,
        ...secondary.custom.descriptions.filter(
          (desc) =>
            !primary.custom.descriptions.some(
              (existing) => normalizeKey(existing) === normalizeKey(desc)
            )
        ),
      ],
    },
  };
}
