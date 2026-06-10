import { formatExperienceTenureLabel } from "@/lib/experienceTenure";
import {
  formatEducationLine,
  formatPdfDateRange,
} from "@/lib/format";
import {
  FlowBlock,
  FlowColumnPage,
  shouldShowSectionTitle,
} from "@/lib/resumeFlowLayout";
import { SECTION_REGISTRY } from "@/lib/sectionConfig";
import { Text, View } from "@react-pdf/renderer";
import { PdfStyles } from "./styles";
import { ResumePdfData } from "./types";

function PdfSectionTitle({
  title,
  titleSuffix,
  styles,
}: {
  title: string;
  titleSuffix?: string;
  styles: PdfStyles;
}) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>
        {titleSuffix ? title : title.toUpperCase()}
        {titleSuffix ? ` (${titleSuffix})` : ""}
      </Text>
    </View>
  );
}

function BulletList({
  text,
  styles,
}: {
  text: string;
  styles: PdfStyles;
}) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  return (
    <View style={styles.bulletList}>
      {lines.map((line, index) => (
        <View
          key={index}
          style={[
            styles.bulletRow,
            index === lines.length - 1 ? { marginBottom: 0 } : {},
          ]}
        >
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{line.replace(/^•\s*/, "")}</Text>
        </View>
      ))}
    </View>
  );
}

function PdfFlowBlock({
  block,
  columnBlocks,
  data,
  summary,
  styles,
}: {
  block: FlowBlock;
  columnBlocks: FlowBlock[];
  data: ResumePdfData;
  summary: string;
  styles: PdfStyles;
}) {
  const showTitle = shouldShowSectionTitle(block, columnBlocks);

  switch (block.sectionKey) {
    case "summary":
      return (
        <View style={styles.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle title="Summary" styles={styles} />
          ) : null}
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      );

    case "experience": {
      const exp = data.experiences[block.entryIndex ?? 0];
      if (!exp) return null;
      const dateRange = formatPdfDateRange(
        exp.startDate,
        exp.endDate,
        exp.currentlyWorking
      );
      const company = exp.companyName.trim();
      const role = exp.jobTitle.trim();
      const location = exp.location.trim();

      return (
        <View style={styles.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle
              title={SECTION_REGISTRY.experience.pdfTitle}
              titleSuffix={
                formatExperienceTenureLabel(data.experiences) || undefined
              }
              styles={styles}
            />
          ) : null}
          <View style={styles.entry}>
            <Text style={styles.entryPrimary}>{role || company || "Experience"}</Text>
            {dateRange ? <Text style={styles.entryMeta}>{dateRange}</Text> : null}
            {company && role ? <Text style={styles.entryAccent}>{company}</Text> : null}
            {location ? <Text style={styles.entryMeta}>{location}</Text> : null}
            {exp.accomplishments ? (
              <BulletList text={exp.accomplishments} styles={styles} />
            ) : null}
          </View>
        </View>
      );
    }

    case "project": {
      const project = data.projects[block.entryIndex ?? 0];
      if (!project) return null;
      const dateRange = formatPdfDateRange(
        project.startDate,
        project.endDate,
        project.currentlyWorking
      );

      return (
        <View style={styles.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle
              title={SECTION_REGISTRY.project.pdfTitle}
              styles={styles}
            />
          ) : null}
          <View style={styles.entry}>
            <Text style={styles.entryPrimary}>{project.projectTitle}</Text>
            {dateRange ? <Text style={styles.entryMeta}>{dateRange}</Text> : null}
            {project.keyFeatures ? (
              <BulletList text={project.keyFeatures} styles={styles} />
            ) : null}
          </View>
        </View>
      );
    }

    case "education": {
      const edu = data.educations[block.entryIndex ?? 0];
      if (!edu) return null;
      const dateRange = formatPdfDateRange(
        edu.startDate,
        edu.endDate,
        edu.currentlyTaking
      );
      const institute = edu.institute.trim();
      const degreeLine = formatEducationLine(edu.degree, edu.gpa);

      return (
        <View style={styles.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle
              title={SECTION_REGISTRY.education.pdfTitle}
              styles={styles}
            />
          ) : null}
          <View style={styles.entry}>
            <Text style={styles.entryPrimary}>
              {degreeLine || institute || "Education"}
            </Text>
            {dateRange ? <Text style={styles.entryMeta}>{dateRange}</Text> : null}
            {institute && degreeLine ? (
              <Text style={styles.entryAccent}>{institute}</Text>
            ) : null}
            {edu.achievements ? (
              <BulletList text={edu.achievements} styles={styles} />
            ) : null}
          </View>
        </View>
      );
    }

    case "skill":
      return (
        <View style={styles.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle
              title={SECTION_REGISTRY.skill.pdfTitle}
              styles={styles}
            />
          ) : null}
          <View style={styles.skillTags}>
            {data.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      );

    default:
      return null;
  }
}

function PdfFlowColumn({
  blocks,
  data,
  summary,
  styles,
}: {
  blocks: FlowBlock[];
  data: ResumePdfData;
  summary: string;
  styles: PdfStyles;
}) {
  return (
    <>
      {blocks.map((block) => (
        <PdfFlowBlock
          key={block.key}
          block={block}
          columnBlocks={blocks}
          data={data}
          summary={summary}
          styles={styles}
        />
      ))}
    </>
  );
}

export function PdfSingleColumnPageBody({
  blocks,
  data,
  summary,
  styles,
}: {
  blocks: FlowBlock[];
  data: ResumePdfData;
  summary: string;
  styles: PdfStyles;
}) {
  return (
    <>
      {blocks.map((block) => (
        <PdfFlowBlock
          key={block.key}
          block={block}
          columnBlocks={blocks}
          data={data}
          summary={summary}
          styles={styles}
        />
      ))}
    </>
  );
}

export function PdfFlowPageBody({
  page,
  data,
  summary,
  styles,
}: {
  page: FlowColumnPage;
  data: ResumePdfData;
  summary: string;
  styles: PdfStyles;
}) {
  return (
    <View style={styles.columns}>
      <View style={styles.flowColumnLeft}>
        <PdfFlowColumn
          blocks={page.left}
          data={data}
          summary={summary}
          styles={styles}
        />
      </View>
      <View style={styles.flowColumnRight}>
        <PdfFlowColumn
          blocks={page.right}
          data={data}
          summary={summary}
          styles={styles}
        />
      </View>
    </View>
  );
}

export function SummarySection({
  summary,
  styles,
}: {
  summary: string;
  styles: PdfStyles;
}) {
  return (
    <View style={styles.section}>
      <PdfSectionTitle title="Summary" styles={styles} />
      <Text style={styles.summaryText}>{summary}</Text>
    </View>
  );
}

export { BulletList, PdfSectionTitle };
