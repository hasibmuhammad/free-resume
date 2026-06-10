import { RESUME_FONT_PRESETS } from "@/lib/templates/fontPresets";
import { getTemplate } from "@/lib/templates/registry";
import {
  ResumeFontPreset,
  ResumeThemeColors,
  ResumeThemeCustomization,
  ResumeTemplateId,
} from "@/lib/templates/types";

export interface ResolvedResumeTheme {
  colors: ResumeThemeColors;
  fontPreset: ResumeFontPreset;
  previewFontFamily: string;
  pdfFontFamily: string;
}

export function resolveResumeTheme(
  templateId: ResumeTemplateId,
  customization: ResumeThemeCustomization = {}
): ResolvedResumeTheme {
  const template = getTemplate(templateId);
  const fontPreset = customization.fontPreset ?? template.defaultFontPreset;
  const fonts = RESUME_FONT_PRESETS[fontPreset] ?? RESUME_FONT_PRESETS.inter;

  const colors: ResumeThemeColors = {
    ...template.defaultTheme,
    ...(customization.primary ? { primary: customization.primary } : {}),
    ...(customization.secondary ? { secondary: customization.secondary } : {}),
    ...(customization.primary
      ? { accent: customization.primary, accentDark: customization.primary }
      : {}),
  };

  return {
    colors,
    fontPreset,
    previewFontFamily: fonts.previewFontFamily,
    pdfFontFamily: fonts.pdfFontFamily,
  };
}
