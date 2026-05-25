import { Font } from "@react-pdf/renderer";
import { RESUME_THEME } from "@/lib/resumeTheme";

let registered = false;

export function registerPdfFonts() {
  if (registered) return;

  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-400-normal.ttf",
        fontWeight: 400,
      },
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-500-normal.ttf",
        fontWeight: 500,
      },
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-600-normal.ttf",
        fontWeight: 600,
      },
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-700-normal.ttf",
        fontWeight: 700,
      },
    ],
  });

  registered = true;
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
