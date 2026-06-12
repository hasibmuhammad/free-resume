import { SectionKey } from "@/types/resume";

export type ResumeTemplateId =
  | "modern-split"
  | "classic-single"
  | "executive"
  | "tech"
  | "elegant"
  | "minimal";

export type ResumeLayoutMode = "split" | "single";

export type ResumeFontPreset =
  | "inter"
  | "roboto"
  | "lato"
  | "montserrat"
  | "open-sans"
  | "raleway"
  | "caladea"
  | "lora"
  | "roboto-slab"
  | "playfair"
  | "merriweather"
  | "classic";

export interface ResumeThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  accentDark: string;
  text: string;
  textMuted: string;
  textLight: string;
  sectionTitle: string;
  border: string;
  borderStrong: string;
  icon: string;
  bullet: string;
  skillUnderline: string;
  link: string;
}

export interface ResumeThemeCustomization {
  primary?: string;
  secondary?: string;
  fontPreset?: ResumeFontPreset;
}

export interface ResumeTemplateDefinition {
  id: ResumeTemplateId;
  name: string;
  description: string;
  layoutMode: ResumeLayoutMode;
  sectionColumns: Record<SectionKey, "main" | "sidebar">;
  defaultTheme: ResumeThemeColors;
  defaultFontPreset: ResumeFontPreset;
}
