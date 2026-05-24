/** Spacing in PDF points (72pt = 1 inch). react-pdf ignores CSS `gap` in many cases. */
export const PDF_LAYOUT = {
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 52,
    paddingRight: 52,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    marginBottom: 8,
  },
  tagline: {
    marginBottom: 12,
  },
  contact: {
    itemGap: 14,
  },
  columns: {
    gap: 32,
    sidebarPaddingLeft: 24,
  },
  section: {
    marginBottom: 22,
    titleMarginBottom: 12,
    accentMarginRight: 10,
  },
  entry: {
    marginBottom: 16,
    roleMarginTop: 4,
    metaMarginTop: 3,
    bulletsMarginTop: 8,
  },
  bullet: {
    rowMarginBottom: 5,
    indent: 4,
    markerWidth: 12,
    markerGap: 6,
  },
  skill: {
    rowMarginBottom: 5,
  },
} as const;
