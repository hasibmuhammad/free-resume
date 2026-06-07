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
import { pdfStyles as s } from "./styles";
import { ResumePdfData } from "./types";

function PdfSectionTitle({ title }: { title: string }) {
  return (
    <View style={s.sectionTitleRow}>
      <Text style={s.sectionTitle}>{title.toUpperCase()}</Text>
    </View>
  );
}

function BulletList({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  return (
    <View style={s.bulletList}>
      {lines.map((line, index) => (
        <View
          key={index}
          style={[
            s.bulletRow,
            index === lines.length - 1 ? { marginBottom: 0 } : {},
          ]}
        >
          <Text style={s.bullet}>•</Text>
          <Text style={s.bulletText}>{line.replace(/^•\s*/, "")}</Text>
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
}: {
  block: FlowBlock;
  columnBlocks: FlowBlock[];
  data: ResumePdfData;
  summary: string;
}) {
  const showTitle = shouldShowSectionTitle(block, columnBlocks);

  switch (block.sectionKey) {
    case "summary":
      return (
        <View style={s.flowBlock}>
          {showTitle ? <PdfSectionTitle title="Summary" /> : null}
          <Text style={s.summaryText}>{summary}</Text>
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
      const meta = [dateRange, location].filter(Boolean).join("  ·  ");

      return (
        <View style={s.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle title={SECTION_REGISTRY.experience.pdfTitle} />
          ) : null}
          <View style={s.entry}>
            <Text style={s.entryPrimary}>{role || company || "Experience"}</Text>
            {company && role ? <Text style={s.entryAccent}>{company}</Text> : null}
            {meta ? <Text style={s.entryMeta}>{meta}</Text> : null}
            {exp.accomplishments ? <BulletList text={exp.accomplishments} /> : null}
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
        <View style={s.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle title={SECTION_REGISTRY.project.pdfTitle} />
          ) : null}
          <View style={s.entry}>
            <Text style={s.entryPrimary}>{project.projectTitle}</Text>
            {dateRange ? <Text style={s.entryMeta}>{dateRange}</Text> : null}
            {project.keyFeatures ? <BulletList text={project.keyFeatures} /> : null}
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
        <View style={s.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle title={SECTION_REGISTRY.education.pdfTitle} />
          ) : null}
          <View style={s.entry}>
            <Text style={s.entryPrimary}>
              {degreeLine || institute || "Education"}
            </Text>
            {institute && degreeLine ? (
              <Text style={s.entryAccent}>{institute}</Text>
            ) : null}
            {dateRange ? <Text style={s.entryMeta}>{dateRange}</Text> : null}
            {edu.achievements ? <BulletList text={edu.achievements} /> : null}
          </View>
        </View>
      );
    }

    case "skill":
      return (
        <View style={s.flowBlock}>
          {showTitle ? (
            <PdfSectionTitle title={SECTION_REGISTRY.skill.pdfTitle} />
          ) : null}
          <View style={s.skillTags}>
            {data.skills.map((skill, index) => (
              <View key={index} style={s.skillTag}>
                <Text style={s.skillTagText}>{skill}</Text>
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
}: {
  blocks: FlowBlock[];
  data: ResumePdfData;
  summary: string;
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
        />
      ))}
    </>
  );
}

export function PdfFlowPageBody({
  page,
  data,
  summary,
}: {
  page: FlowColumnPage;
  data: ResumePdfData;
  summary: string;
}) {
  return (
    <View style={s.columns}>
      <View style={s.flowColumnLeft}>
        <PdfFlowColumn blocks={page.left} data={data} summary={summary} />
      </View>
      <View style={s.flowColumnRight}>
        <PdfFlowColumn blocks={page.right} data={data} summary={summary} />
      </View>
    </View>
  );
}

function SummarySection({ summary }: { summary: string }) {
  return (
    <View style={s.section}>
      <PdfSectionTitle title="Summary" />
      <Text style={s.summaryText}>{summary}</Text>
    </View>
  );
}

export { BulletList, PdfSectionTitle, SummarySection };
