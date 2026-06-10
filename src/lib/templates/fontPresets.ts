import { ResumeFontPreset } from "@/lib/templates/types";

export type FontCategory = "sans" | "serif";

export interface FontPresetDefinition {
  id: ResumeFontPreset;
  label: string;
  category: FontCategory;
  previewFontFamily: string;
  pdfFontFamily: string;
  /** fontsource package slug; null uses a built-in PDF font */
  fontsourceSlug: string | null;
}

export const RESUME_FONT_PRESET_LIST: FontPresetDefinition[] = [
  {
    id: "inter",
    label: "Inter",
    category: "sans",
    previewFontFamily: "Inter, system-ui, sans-serif",
    pdfFontFamily: "Inter",
    fontsourceSlug: "inter",
  },
  {
    id: "roboto",
    label: "Roboto",
    category: "sans",
    previewFontFamily: "Roboto, system-ui, sans-serif",
    pdfFontFamily: "Roboto",
    fontsourceSlug: "roboto",
  },
  {
    id: "lato",
    label: "Lato",
    category: "sans",
    previewFontFamily: "Lato, system-ui, sans-serif",
    pdfFontFamily: "Lato",
    fontsourceSlug: "lato",
  },
  {
    id: "montserrat",
    label: "Montserrat",
    category: "sans",
    previewFontFamily: "Montserrat, system-ui, sans-serif",
    pdfFontFamily: "Montserrat",
    fontsourceSlug: "montserrat",
  },
  {
    id: "open-sans",
    label: "Open Sans",
    category: "sans",
    previewFontFamily: "'Open Sans', system-ui, sans-serif",
    pdfFontFamily: "Open Sans",
    fontsourceSlug: "open-sans",
  },
  {
    id: "raleway",
    label: "Raleway",
    category: "sans",
    previewFontFamily: "Raleway, system-ui, sans-serif",
    pdfFontFamily: "Raleway",
    fontsourceSlug: "raleway",
  },
  {
    id: "caladea",
    label: "Caladea",
    category: "serif",
    previewFontFamily: "Caladea, Georgia, serif",
    pdfFontFamily: "Caladea",
    fontsourceSlug: "caladea",
  },
  {
    id: "lora",
    label: "Lora",
    category: "serif",
    previewFontFamily: "Lora, Georgia, serif",
    pdfFontFamily: "Lora",
    fontsourceSlug: "lora",
  },
  {
    id: "roboto-slab",
    label: "Roboto Slab",
    category: "serif",
    previewFontFamily: "'Roboto Slab', Georgia, serif",
    pdfFontFamily: "Roboto Slab",
    fontsourceSlug: "roboto-slab",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    category: "serif",
    previewFontFamily: "'Playfair Display', Georgia, serif",
    pdfFontFamily: "Playfair Display",
    fontsourceSlug: "playfair-display",
  },
  {
    id: "merriweather",
    label: "Merriweather",
    category: "serif",
    previewFontFamily: "Merriweather, Georgia, serif",
    pdfFontFamily: "Merriweather",
    fontsourceSlug: "merriweather",
  },
  {
    id: "classic",
    label: "Georgia",
    category: "serif",
    previewFontFamily: "Georgia, 'Times New Roman', serif",
    pdfFontFamily: "Times-Roman",
    fontsourceSlug: null,
  },
];

export const RESUME_FONT_PRESETS: Record<
  ResumeFontPreset,
  FontPresetDefinition
> = Object.fromEntries(
  RESUME_FONT_PRESET_LIST.map((preset) => [preset.id, preset])
) as Record<ResumeFontPreset, FontPresetDefinition>;

export function isResumeFontPreset(value: unknown): value is ResumeFontPreset {
  return (
    typeof value === "string" &&
    RESUME_FONT_PRESET_LIST.some((preset) => preset.id === value)
  );
}

/** Google Fonts stylesheet for resume preview rendering. */
export const RESUME_GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Inter:wght@400;500;600;700",
    "family=Roboto:wght@400;500;600;700",
    "family=Lato:wght@400;500;600;700",
    "family=Montserrat:wght@400;500;600;700",
    "family=Open+Sans:wght@400;500;600;700",
    "family=Raleway:wght@400;500;600;700",
    "family=Caladea:wght@400;700",
    "family=Lora:wght@400;500;600;700",
    "family=Roboto+Slab:wght@400;500;600;700",
    "family=Playfair+Display:wght@400;500;600;700",
    "family=Merriweather:wght@400;700",
  ].join("&") +
  "&display=swap";
