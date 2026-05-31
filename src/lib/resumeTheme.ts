/**
 * Enhancv-inspired dual-accent theme (navy + warm highlight).
 * Colors and spacing tuned against reference two-column templates.
 */
export const RESUME_THEME = {
  primary: "#2B4570",
  secondary: "#D97040",
  accent: "#2B4570",
  accentDark: "#2B4570",
  text: "#2D3748",
  textMuted: "#4A5568",
  textLight: "#718096",
  sectionTitle: "#A0AEC0",
  border: "#E2E8F0",
  borderStrong: "#E2E8F0",
  icon: "#718096",
  bullet: "#4A5568",
  skillUnderline: "#CBD5E1",
  link: "#718096",
} as const;

export const RESUME_TYPOGRAPHY = {
  lineHeight: {
    heading: 1.2,
    body: 1.38,
    contact: 1.35,
  },
} as const;

export const RESUME_LAYOUT = {
  /** A4 page width in PDF points (72 dpi). */
  pageWidth: 595.28,
  /** A4 page height in PDF points (72 dpi). */
  pageHeight: 841.89,
  marginX: 48,
  marginTop: 40,
  marginBottom: 48,
  columnGap: 28,
  mainFlex: 1.85,
  sidebarFlex: 1,
  bulletIndent: 8,
  spacing: {
    headerBottom: 16,
    nameBottom: 4,
    designationBottom: 8,
    contactTop: 8,
    sectionBottom: 14,
    sectionTitleBottom: 8,
    entryBottom: 10,
    titleToAccent: 2,
    accentToMeta: 3,
    metaToDetails: 5,
    bulletGap: 2,
  },
} as const;

export const RESUME_PREVIEW_PADDING = {
  x: RESUME_LAYOUT.marginX,
  top: RESUME_LAYOUT.marginTop,
  bottom: RESUME_LAYOUT.marginBottom,
} as const;
