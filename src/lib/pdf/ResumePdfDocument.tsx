import { buildContactFields } from "@/lib/contactFields";
import {
  buildFlowBlocks,
  paginateFlowColumns,
  paginateFlowSingleColumn,
} from "@/lib/resumeFlowLayout";
import { shouldUseSplitColumnLayout } from "@/lib/resumeLayout";
import {
  Document,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { getPdfSectionContentMap } from "./buildResumePdfData";
import { registerPdfFontPreset } from "./fonts";
import {
  PdfEmailIcon,
  PdfGithubIcon,
  PdfLinkedinIcon,
  PdfLocationIcon,
  PdfPhoneIcon,
} from "./icons";
import { PdfFlowPageBody, PdfSingleColumnPageBody } from "./pdfFlowLayout";
import { PDF_PAGE_SIZE } from "./layout";
import { createPdfStyles } from "./styles";
import { ResumePdfData } from "./types";

function ContactSeparator({ styles }: { styles: ReturnType<typeof createPdfStyles> }) {
  return <Text style={styles.contactSeparator}>·</Text>;
}

type ContactKind = "email" | "phone" | "github" | "linkedin" | "location";

function ContactIcon({
  kind,
  iconColor,
}: {
  kind: ContactKind;
  iconColor: string;
}) {
  const props = { color: iconColor, size: 8 };

  switch (kind) {
    case "email":
      return <PdfEmailIcon {...props} />;
    case "phone":
      return <PdfPhoneIcon {...props} />;
    case "github":
      return <PdfGithubIcon {...props} />;
    case "linkedin":
      return <PdfLinkedinIcon {...props} />;
    case "location":
      return <PdfLocationIcon {...props} />;
  }
}

function PdfHeader({
  data,
  styles,
}: {
  data: ResumePdfData;
  styles: ReturnType<typeof createPdfStyles>;
}) {
  const { basicInfo, theme } = data;
  const designation = basicInfo.designation.trim();
  const contactItems = buildContactFields(basicInfo);

  return (
    <View style={styles.header}>
      <View style={styles.nameBlock}>
        <Text style={styles.name}>{basicInfo.fullName || "Your Name"}</Text>
      </View>

      {designation ? (
        <View style={styles.designationBlock}>
          <Text style={styles.designation}>{designation}</Text>
        </View>
      ) : null}

      {contactItems.length > 0 ? (
        <View style={styles.contactRow}>
          {contactItems.map((item, index) => (
            <View key={`${item.label}-${index}`} style={styles.contactItemWrap} wrap={false}>
              <View style={styles.contactIcon}>
                <ContactIcon kind={item.kind} iconColor={theme.colors.icon} />
              </View>
              {item.href ? (
                <Link src={item.href} style={styles.contactLink}>
                  {item.label}
                </Link>
              ) : (
                <Text style={styles.contactItem}>{item.label}</Text>
              )}
              {index < contactItems.length - 1 ? (
                <ContactSeparator styles={styles} />
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export function ResumePdfDocument({ data }: { data: ResumePdfData }) {
  registerPdfFontPreset(data.theme.fontPreset);

  const styles = createPdfStyles(data.theme);
  const summary = data.basicInfo.summary.trim();
  const contentMap = getPdfSectionContentMap(data);
  const useSplitColumn = shouldUseSplitColumnLayout(
    data.sections,
    data.visibility,
    contentMap,
    data.templateId
  );

  const flowInput = {
    summary,
    experiences: data.experiences,
    projects: data.projects,
    educations: data.educations,
    skills: data.skills,
  };

  const measure = useSplitColumn ? "split" : "single";

  const flowBlocks = buildFlowBlocks(
    data.sections,
    data.visibility,
    contentMap,
    flowInput,
    measure
  );

  const splitPages = useSplitColumn ? paginateFlowColumns(flowBlocks) : [];
  const singlePages = useSplitColumn ? [] : paginateFlowSingleColumn(flowBlocks);

  return (
    <Document
      title={`${data.basicInfo.fullName || "Resume"} - Resume`}
      author={data.basicInfo.fullName || undefined}
      subject="Resume"
    >
      {useSplitColumn
        ? splitPages.map((page, pageIndex) => (
          <Page
            key={`page-${pageIndex}`}
            size={PDF_PAGE_SIZE}
            style={styles.page}
            wrap={false}
          >
            <View style={styles.pageBody}>
              {pageIndex === 0 ? <PdfHeader data={data} styles={styles} /> : null}
              <PdfFlowPageBody
                page={page}
                data={data}
                summary={summary}
                styles={styles}
              />
              <View style={styles.pageFiller} />
            </View>
          </Page>
        ))
        : singlePages.map((pageBlocks, pageIndex) => (
          <Page
            key={`page-${pageIndex}`}
            size={PDF_PAGE_SIZE}
            style={styles.page}
            wrap={false}
          >
            <View style={styles.pageBody}>
              {pageIndex === 0 ? <PdfHeader data={data} styles={styles} /> : null}
              <PdfSingleColumnPageBody
                blocks={pageBlocks}
                data={data}
                summary={summary}
                styles={styles}
              />
              <View style={styles.pageFiller} />
            </View>
          </Page>
        ))}
    </Document>
  );
}

export default ResumePdfDocument;
