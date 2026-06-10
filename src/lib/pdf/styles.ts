import { StyleSheet } from "@react-pdf/renderer";
import { RESUME_TYPOGRAPHY as T } from "@/lib/resumeTheme";
import { ResolvedResumeTheme } from "@/lib/templates/resolveTheme";
import { PDF_LAYOUT as L, PDF_PAGE_SIZE } from "./layout";

const BODY_LH = T.lineHeight.body;
const ENTRY_LH = T.lineHeight.entry;

export function createPdfStyles(theme: ResolvedResumeTheme) {
  const c = theme.colors;
  const fontFamily = theme.pdfFontFamily;

  return StyleSheet.create({
    page: {
      width: PDF_PAGE_SIZE.width,
      height: PDF_PAGE_SIZE.height,
      minHeight: PDF_PAGE_SIZE.height,
      maxHeight: PDF_PAGE_SIZE.height,
      paddingTop: L.page.paddingTop,
      paddingBottom: L.page.paddingBottom,
      paddingLeft: L.page.paddingLeft,
      paddingRight: L.page.paddingRight,
      fontFamily,
      fontSize: T.fontSize.body,
      lineHeight: BODY_LH,
      color: c.textMuted,
      backgroundColor: "#ffffff",
    },
    pageBody: {
      height: PDF_PAGE_SIZE.height,
      minHeight: PDF_PAGE_SIZE.height,
      flexDirection: "column",
      paddingTop: L.pageBody.paddingTop,
      paddingBottom: L.pageBody.paddingBottom,
      paddingLeft: L.pageBody.paddingLeft,
      paddingRight: L.pageBody.paddingRight,
    },
    pageFiller: {
      flexGrow: 1,
    },
    header: {
      marginBottom: L.header.marginBottom,
    },
    nameBlock: {
      marginBottom: L.name.marginBottom,
    },
    name: {
      fontFamily,
      fontWeight: 700,
      fontSize: T.fontSize.name,
      lineHeight: T.lineHeight.heading,
      color: c.primary,
      letterSpacing: -0.15,
    },
    designationBlock: {
      marginBottom: L.designation.marginBottom,
    },
    designation: {
      fontFamily,
      fontWeight: 600,
      fontSize: T.fontSize.designation,
      lineHeight: ENTRY_LH,
      color: c.secondary,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: L.contact.marginTop,
    },
    contactItemWrap: {
      flexDirection: "row",
      alignItems: "center",
    },
    contactIcon: {
      marginRight: L.contact.iconGap,
    },
    contactSeparator: {
      fontSize: T.fontSize.contact,
      color: c.border,
      marginLeft: L.contact.separatorGap,
      marginRight: L.contact.separatorGap,
      lineHeight: T.lineHeight.contact,
    },
    contactItem: {
      fontSize: T.fontSize.contact,
      color: c.textLight,
      lineHeight: T.lineHeight.contact,
    },
    contactLink: {
      fontSize: T.fontSize.contact,
      color: c.textLight,
      textDecoration: "none",
      lineHeight: T.lineHeight.contact,
    },
    columns: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    flowColumnLeft: {
      flex: 1.85,
      minWidth: 0,
      paddingRight: L.columns.gap / 2,
    },
    flowColumnRight: {
      flex: 1,
      minWidth: 0,
      paddingLeft: L.columns.gap / 2,
    },
    mainColumn: {
      flex: 1.85,
      paddingRight: L.columns.gap / 2,
    },
    sidebarColumn: {
      flex: 1,
      paddingLeft: L.columns.gap / 2,
    },
    section: {
      marginBottom: L.section.marginBottom,
    },
    flowBlock: {
      marginBottom: L.section.marginBottom,
    },
    sectionTitleRow: {
      borderBottomWidth: L.section.ruleHeight,
      borderBottomColor: c.borderStrong,
      paddingBottom: L.section.titlePaddingBottom,
      marginBottom: L.section.titleMarginBottom,
    },
    sectionTitle: {
      fontFamily,
      fontWeight: 700,
      fontSize: T.fontSize.sectionTitle,
      letterSpacing: T.letterSpacing.sectionTitle,
      textTransform: "uppercase",
      color: c.sectionTitle,
    },
    summaryText: {
      fontSize: T.fontSize.body,
      color: c.textMuted,
      lineHeight: BODY_LH,
    },
    entry: {
      marginBottom: L.entry.marginBottom,
    },
    entryPrimary: {
      fontFamily,
      fontWeight: 700,
      fontSize: T.fontSize.entryTitle,
      color: c.primary,
      lineHeight: ENTRY_LH,
    },
    entryAccent: {
      fontFamily,
      fontWeight: 600,
      fontSize: T.fontSize.entryAccent,
      color: c.secondary,
      marginTop: L.entry.subheaderMarginTop,
      lineHeight: ENTRY_LH,
    },
    entryHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    entryHeaderTitle: {
      fontFamily,
      fontWeight: 700,
      fontSize: T.fontSize.entryTitle,
      color: c.primary,
      flex: 1,
      paddingRight: 8,
      lineHeight: ENTRY_LH,
    },
    entryMeta: {
      fontSize: T.fontSize.meta,
      color: c.textLight,
      marginTop: L.entry.metaMarginTop,
      lineHeight: ENTRY_LH,
    },
    entryDate: {
      fontSize: T.fontSize.meta,
      color: c.textLight,
      flexShrink: 0,
      lineHeight: ENTRY_LH,
      textAlign: "right",
      minWidth: 76,
    },
    bulletList: {
      marginTop: L.entry.bulletsMarginTop,
      paddingLeft: L.bullet.indent,
    },
    bulletRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: L.bullet.rowMarginBottom,
    },
    bullet: {
      fontSize: T.fontSize.bullet,
      color: c.bullet,
      width: L.bullet.markerWidth,
      lineHeight: BODY_LH,
      marginRight: L.bullet.markerGap,
    },
    bulletText: {
      flex: 1,
      fontSize: T.fontSize.bullet,
      color: c.textMuted,
      lineHeight: BODY_LH,
    },
    skillTags: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skillTag: {
      borderBottomWidth: 1,
      borderBottomColor: c.skillUnderline,
      paddingBottom: 1,
      marginRight: L.skill.tagMarginRight,
      marginBottom: L.skill.tagMarginBottom,
    },
    skillTagText: {
      fontSize: T.fontSize.skill,
      color: c.textMuted,
      lineHeight: ENTRY_LH,
    },
  });
}

export type PdfStyles = ReturnType<typeof createPdfStyles>;

/** Default styles for modules that still import statically during migration. */
export const pdfStyles = createPdfStyles({
  colors: {
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
  },
  fontPreset: "inter",
  previewFontFamily: "Inter, system-ui, sans-serif",
  pdfFontFamily: "Inter",
});
