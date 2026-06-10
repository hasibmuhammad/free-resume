import { BasicInfo } from "@/types/resume";
import { displayLink, normalizeUrl } from "@/lib/format";

export type ContactFieldKind =
  | "phone"
  | "email"
  | "location"
  | "github"
  | "linkedin";

export interface ContactField {
  kind: ContactFieldKind;
  label: string;
  href?: string;
}

/** Contact row order: phone, email, location, github, linkedin (last). */
export function buildContactFields(basicInfo: BasicInfo): ContactField[] {
  const items: ContactField[] = [];

  if (basicInfo.phone.trim()) {
    items.push({ kind: "phone", label: basicInfo.phone.trim() });
  }
  if (basicInfo.email.trim()) {
    items.push({ kind: "email", label: basicInfo.email.trim() });
  }
  if (basicInfo.location.trim()) {
    items.push({ kind: "location", label: basicInfo.location.trim() });
  }
  if (basicInfo.github.trim()) {
    const github = basicInfo.github.trim();
    items.push({
      kind: "github",
      label: displayLink(github),
      href: normalizeUrl(github),
    });
  }
  if (basicInfo.linkedin.trim()) {
    const linkedin = basicInfo.linkedin.trim();
    items.push({
      kind: "linkedin",
      label: displayLink(linkedin),
      href: normalizeUrl(linkedin),
    });
  }

  return items;
}
