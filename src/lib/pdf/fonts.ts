import { Font } from "@react-pdf/renderer";

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

/** Open Resume–inspired accent palette */
export const PDF_COLORS = {
  accent: "#0284c7",
  accentLight: "#e0f2fe",
  text: "#171717",
  textMuted: "#525252",
  textLight: "#737373",
  border: "#e5e5e5",
  bullet: "#404040",
};
