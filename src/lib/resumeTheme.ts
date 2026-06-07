/**
 * Enhancv-inspired dual-accent theme (navy + warm highlight).
 * Compact typography and spacing so more content fits per page.
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
  fontSize: {
    name: 18,
    designation: 9,
    body: 9,
    entryTitle: 9.5,
    entryAccent: 9,
    meta: 8,
    sectionTitle: 8,
    contact: 8,
    bullet: 8.5,
    skill: 8.5,
  },
  lineHeight: {
    heading: 1.15,
    body: 1.28,
    contact: 1.25,
    entry: 1.28,
  },
  letterSpacing: {
    sectionTitle: 0.5,
  },
} as const;

export const RESUME_LAYOUT = {
  /** A4 page width in PDF points (72 dpi). */
  pageWidth: 595.28,
  /** A4 page height in PDF points (72 dpi). */
  pageHeight: 841.89,
  marginX: 36,
  /** Vertical page inset — equal top/bottom on preview and PDF. */
  pageMarginY: 32,
  columnGap: 22,
  mainFlex: 1.85,
  sidebarFlex: 1,
  bulletIndent: 6,
  spacing: {
    headerBottom: 10,
    nameBottom: 2,
    designationBottom: 4,
    contactTop: 4,
    sectionBottom: 8,
    sectionTitleBottom: 4,
    entryBottom: 6,
    titleToAccent: 1,
    accentToMeta: 1,
    metaToDetails: 3,
    bulletGap: 1,
    skillTagGapX: 10,
    skillTagGapY: 4,
    contactIconGap: 3,
    contactSeparatorGap: 5,
  },
  /** Height estimates for flow pagination (PDF points). */
  flow: {
    headerReserve: 72,
    sectionTitleHeight: 17,
    entryBaseHeight: 20,
    bulletLineHeight: 9,
    summaryLineHeight: 11,
    skillRowHeight: 13,
    charsPerLine: 56,
    summaryCharsPerLine: 64,
  },
} as const;

export const RESUME_PREVIEW_PADDING = {
  x: RESUME_LAYOUT.marginX,
  top: RESUME_LAYOUT.pageMarginY,
  bottom: RESUME_LAYOUT.pageMarginY,
} as const;
