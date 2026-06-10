import { Font } from "@react-pdf/renderer";
import {
  RESUME_FONT_PRESETS,
  type FontPresetDefinition,
} from "@/lib/templates/fontPresets";
import { ResumeFontPreset } from "@/lib/templates/types";
import { RESUME_THEME } from "@/lib/resumeTheme";

const registered = new Set<ResumeFontPreset>();

const FONT_WEIGHTS = [400, 500, 600, 700] as const;

function fontsourceUrl(slug: string, weight: number): string {
  return `https://cdn.jsdelivr.net/fontsource/fonts/${slug}@5.2.5/latin-${weight}-normal.ttf`;
}

function buildFontFiles(slug: string) {
  const regular = fontsourceUrl(slug, 400);
  const bold = fontsourceUrl(slug, 700);

  return FONT_WEIGHTS.map((weight) => ({
    src: weight >= 600 ? bold : regular,
    fontWeight: weight,
  }));
}

function registerPreset(preset: FontPresetDefinition) {
  if (!preset.fontsourceSlug || registered.has(preset.id)) return;

  Font.register({
    family: preset.pdfFontFamily,
    fonts: buildFontFiles(preset.fontsourceSlug),
  });

  registered.add(preset.id);
}

export function registerPdfFontPreset(preset: ResumeFontPreset) {
  const definition = RESUME_FONT_PRESETS[preset];
  if (!definition?.fontsourceSlug) return;
  registerPreset(definition);
}

/** @deprecated Use registerPdfFontPreset */
export function registerPdfFonts() {
  registerPdfFontPreset("inter");
}

export const PDF_COLORS = {
  primary: RESUME_THEME.primary,
  secondary: RESUME_THEME.secondary,
  accent: RESUME_THEME.accent,
  accentDark: RESUME_THEME.accentDark,
  text: RESUME_THEME.text,
  textMuted: RESUME_THEME.textMuted,
  textLight: RESUME_THEME.textLight,
  sectionTitle: RESUME_THEME.sectionTitle,
  border: RESUME_THEME.border,
  borderStrong: RESUME_THEME.borderStrong,
  icon: RESUME_THEME.icon,
  bullet: RESUME_THEME.bullet,
  skillUnderline: RESUME_THEME.skillUnderline,
  link: RESUME_THEME.link,
};
