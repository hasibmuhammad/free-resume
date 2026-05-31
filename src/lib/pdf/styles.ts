import { StyleSheet } from "@react-pdf/renderer";
import { RESUME_TYPOGRAPHY as T } from "@/lib/resumeTheme";
import { PDF_COLORS as c } from "./fonts";
import { PDF_LAYOUT as L } from "./layout";

const BODY_LH = T.lineHeight.body;
const ENTRY_LH = T.lineHeight.entry;

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: L.page.paddingTop,
    paddingBottom: L.page.paddingBottom,
    paddingLeft: L.page.paddingLeft,
    paddingRight: L.page.paddingRight,
    fontFamily: "Inter",
    fontSize: T.fontSize.body,
    lineHeight: BODY_LH,
    color: c.textMuted,
    backgroundColor: "#ffffff",
  },
  pageBody: {
    paddingTop: L.pageBody.paddingTop,
    paddingBottom: L.pageBody.paddingBottom,
    paddingLeft: L.pageBody.paddingLeft,
    paddingRight: L.pageBody.paddingRight,
  },
  header: {
    marginBottom: L.header.marginBottom,
  },
  nameBlock: {
    marginBottom: L.name.marginBottom,
  },
  name: {
    fontFamily: "Inter",
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
    fontFamily: "Inter",
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
    fontFamily: "Inter",
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
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: T.fontSize.entryTitle,
    color: c.primary,
    lineHeight: ENTRY_LH,
  },
  entryAccent: {
    fontFamily: "Inter",
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
    fontFamily: "Inter",
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
