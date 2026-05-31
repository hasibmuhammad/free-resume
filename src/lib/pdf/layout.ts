import { RESUME_LAYOUT as R } from "@/lib/resumeTheme";

const S = R.spacing;

export const PDF_LAYOUT = {
  page: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  pageBody: {
    paddingTop: R.marginTop,
    paddingBottom: R.marginBottom,
    paddingLeft: R.marginX,
    paddingRight: R.marginX,
  },
  header: {
    marginBottom: S.headerBottom,
  },
  name: {
    marginBottom: S.nameBottom,
  },
  designation: {
    marginBottom: S.designationBottom,
  },
  contact: {
    marginTop: S.contactTop,
    iconGap: S.contactIconGap,
    separatorGap: S.contactSeparatorGap,
  },
  columns: {
    gap: R.columnGap,
  },
  section: {
    marginBottom: S.sectionBottom,
    titleMarginBottom: S.sectionTitleBottom,
    ruleHeight: 1,
    titlePaddingBottom: 2,
  },
  entry: {
    marginBottom: S.entryBottom,
    subheaderMarginTop: S.titleToAccent,
    metaMarginTop: S.accentToMeta,
    bulletsMarginTop: S.metaToDetails,
  },
  bullet: {
    rowMarginBottom: S.bulletGap,
    indent: R.bulletIndent,
    markerWidth: 8,
    markerGap: 4,
  },
  skill: {
    tagMarginRight: S.skillTagGapX,
    tagMarginBottom: S.skillTagGapY,
  },
} as const;
