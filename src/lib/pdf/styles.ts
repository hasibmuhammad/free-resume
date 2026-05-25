import { StyleSheet } from "@react-pdf/renderer";
import { PDF_COLORS as c } from "./fonts";
import { PDF_LAYOUT as L } from "./layout";

const BODY_LH = 1.38;

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: L.page.paddingTop,
    paddingBottom: L.page.paddingBottom,
    paddingLeft: L.page.paddingLeft,
    paddingRight: L.page.paddingRight,
    fontFamily: "Inter",
    fontSize: 10,
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
    fontSize: 22,
    lineHeight: 1.2,
    color: c.primary,
    letterSpacing: -0.2,
  },
  designationBlock: {
    marginBottom: L.designation.marginBottom,
  },
  designation: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 1.38,
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
    fontSize: 9,
    color: c.border,
    marginLeft: L.contact.separatorGap,
    marginRight: L.contact.separatorGap,
    lineHeight: 1.35,
  },
  contactItem: {
    fontSize: 9,
    color: c.textLight,
    lineHeight: 1.35,
  },
  contactLink: {
    fontSize: 9,
    color: c.textLight,
    textDecoration: "none",
    lineHeight: 1.35,
  },
  columns: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  sectionTitleRow: {
    borderBottomWidth: L.section.ruleHeight,
    borderBottomColor: c.borderStrong,
    paddingBottom: 3,
    marginBottom: L.section.titleMarginBottom,
  },
  sectionTitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: c.sectionTitle,
  },
  summaryText: {
    fontSize: 10,
    color: c.textMuted,
    lineHeight: BODY_LH,
  },
  entry: {
    marginBottom: L.entry.marginBottom,
  },
  entryPrimary: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10.5,
    color: c.primary,
    lineHeight: 1.35,
  },
  entryAccent: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 10,
    color: c.secondary,
    marginTop: L.entry.subheaderMarginTop,
    lineHeight: 1.35,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryHeaderTitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10.5,
    color: c.primary,
    flex: 1,
    paddingRight: 10,
    lineHeight: 1.35,
  },
  entryMeta: {
    fontSize: 9,
    color: c.textLight,
    marginTop: L.entry.metaMarginTop,
    lineHeight: 1.35,
  },
  entryDate: {
    fontSize: 9,
    color: c.textLight,
    flexShrink: 0,
    lineHeight: 1.35,
    textAlign: "right",
    minWidth: 84,
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
    fontSize: 9.5,
    color: c.bullet,
    width: L.bullet.markerWidth,
    lineHeight: BODY_LH,
    marginRight: L.bullet.markerGap,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
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
    marginRight: 12,
    marginBottom: 6,
  },
  skillTagText: {
    fontSize: 9.5,
    color: c.textMuted,
    lineHeight: 1.35,
  },
});
