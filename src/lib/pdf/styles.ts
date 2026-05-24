import { StyleSheet } from "@react-pdf/renderer";
import { PDF_COLORS as c } from "./fonts";
import { PDF_LAYOUT as L } from "./layout";

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: L.page.paddingTop,
    paddingBottom: L.page.paddingBottom,
    paddingLeft: L.page.paddingLeft,
    paddingRight: L.page.paddingRight,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.55,
    color: c.text,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: L.header.marginBottom,
  },
  name: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 26,
    color: c.accent,
    letterSpacing: -0.3,
    marginBottom: L.name.marginBottom,
  },
  tagline: {
    fontSize: 10.5,
    color: c.textMuted,
    lineHeight: 1.6,
    marginBottom: L.tagline.marginBottom,
    maxWidth: "100%",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactSeparator: {
    fontSize: 9,
    color: "#d4d4d4",
    marginHorizontal: 8,
    lineHeight: 1.4,
  },
  contactItemWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 9,
    color: c.textLight,
    lineHeight: 1.4,
  },
  contactLink: {
    fontSize: 9,
    color: c.textLight,
    textDecoration: "none",
    lineHeight: 1.4,
  },
  columns: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  mainColumn: {
    flex: 1.72,
    paddingRight: L.columns.gap / 2,
  },
  sidebarColumn: {
    flex: 1,
    paddingLeft: L.columns.sidebarPaddingLeft,
    borderLeftWidth: 1,
    borderLeftColor: c.border,
  },
  section: {
    marginBottom: L.section.marginBottom,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: L.section.titleMarginBottom,
  },
  sectionAccent: {
    width: 28,
    height: 3,
    backgroundColor: c.accent,
    borderRadius: 1,
    marginRight: L.section.accentMarginRight,
  },
  sectionTitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: c.text,
  },
  entry: {
    marginBottom: L.entry.marginBottom,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryPrimary: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10.5,
    color: c.text,
    flex: 1,
    paddingRight: 12,
    lineHeight: 1.4,
  },
  entryDate: {
    fontSize: 9,
    color: c.textLight,
    flexShrink: 0,
    lineHeight: 1.4,
    textAlign: "right",
    minWidth: 72,
  },
  entryRole: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 10,
    color: c.text,
    marginTop: L.entry.roleMarginTop,
    lineHeight: 1.45,
  },
  entryMeta: {
    fontSize: 9,
    color: c.textMuted,
    marginTop: L.entry.metaMarginTop,
    lineHeight: 1.45,
  },
  entryExtra: {
    fontSize: 9,
    color: c.textLight,
    marginTop: L.entry.metaMarginTop,
    lineHeight: 1.45,
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
    fontSize: 10,
    color: c.bullet,
    width: L.bullet.markerWidth,
    lineHeight: 1.55,
    marginRight: L.bullet.markerGap,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: c.textMuted,
    lineHeight: 1.6,
  },
  skillList: {
    paddingLeft: L.bullet.indent,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: L.skill.rowMarginBottom,
  },
  skillText: {
    flex: 1,
    fontSize: 9.5,
    color: c.textMuted,
    lineHeight: 1.55,
  },
});
