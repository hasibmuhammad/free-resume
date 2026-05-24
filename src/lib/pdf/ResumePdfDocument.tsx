import {
  Document,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { formatDateRange, displayLink, normalizeUrl } from "@/lib/format";
import { SECTION_REGISTRY } from "@/lib/sectionConfig";
import { SectionKey } from "@/types/resume";
import { sectionHasPdfContent } from "./buildResumePdfData";
import { registerPdfFonts } from "./fonts";
import { pdfStyles as s } from "./styles";
import { ResumePdfData } from "./types";

registerPdfFonts();

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

function PdfSectionTitle({ title }: { title: string }) {
  return (
    <View style={s.sectionTitleRow} minPresenceAhead={28} wrap={false}>
      <View style={s.sectionAccent} />
      <Text style={s.sectionTitle}>{title}</Text>
    </View>
  );
}

function ContactSeparator() {
  return <Text style={s.contactSeparator}>·</Text>;
}

function PdfHeader({ data }: { data: ResumePdfData }) {
  const { basicInfo } = data;
  const tagline = basicInfo.designation.trim() || basicInfo.summary.trim();

  const contactItems: { label: string; href?: string }[] = [];
  if (basicInfo.email) contactItems.push({ label: basicInfo.email });
  if (basicInfo.phone) contactItems.push({ label: basicInfo.phone });
  if (basicInfo.location) contactItems.push({ label: basicInfo.location });
  if (basicInfo.linkedin) {
    contactItems.push({
      label: displayLink(basicInfo.linkedin),
      href: normalizeUrl(basicInfo.linkedin),
    });
  }
  if (basicInfo.github) {
    contactItems.push({
      label: displayLink(basicInfo.github),
      href: normalizeUrl(basicInfo.github),
    });
  }

  return (
    <View style={s.header}>
      <Text style={s.name}>{basicInfo.fullName || "Your Name"}</Text>

      {tagline ? <Text style={s.tagline}>{tagline}</Text> : null}

      {contactItems.length > 0 ? (
        <View style={s.contactRow}>
          {contactItems.map((item, index) => (
            <View
              key={`${item.label}-${index}`}
              style={s.contactItemWrap}
            >
              {index > 0 ? <ContactSeparator /> : null}
              {item.href ? (
                <Link src={item.href} style={s.contactLink}>
                  {item.label}
                </Link>
              ) : (
                <Text style={s.contactItem}>{item.label}</Text>
              )}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function ExperienceSection({ data }: { data: ResumePdfData }) {
  if (!sectionHasPdfContent("experience", data)) return null;

  return (
    <View style={s.section}>
      <PdfSectionTitle title={SECTION_REGISTRY.experience.previewTitle} />
      {data.experiences.map((exp, index) => {
        const dateRange = formatDateRange(
          exp.startDate,
          exp.endDate,
          exp.currentlyWorking
        );
        const company = exp.companyName.trim();
        const role = exp.jobTitle.trim();

        return (
          <View key={index} style={s.entry}>
            <View style={s.entryHeader} wrap={false}>
              <Text style={s.entryPrimary}>
                {company || role || "Experience"}
              </Text>
              {dateRange ? <Text style={s.entryDate}>{dateRange}</Text> : null}
            </View>
            {company && role ? (
              <Text style={s.entryRole}>{role}</Text>
            ) : null}
            {exp.location ? (
              <Text style={s.entryMeta}>{exp.location}</Text>
            ) : null}
            {exp.accomplishments ? (
              <BulletList text={exp.accomplishments} />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

function ProjectSection({ data }: { data: ResumePdfData }) {
  if (!sectionHasPdfContent("project", data)) return null;

  return (
    <View style={s.section}>
      <PdfSectionTitle title={SECTION_REGISTRY.project.previewTitle} />
      {data.projects.map((project, index) => {
        const dateRange = formatDateRange(
          project.startDate,
          project.endDate,
          project.currentlyWorking
        );

        return (
          <View key={index} style={s.entry}>
            <View style={s.entryHeader} wrap={false}>
              <Text style={s.entryPrimary}>{project.projectTitle}</Text>
              {dateRange ? <Text style={s.entryDate}>{dateRange}</Text> : null}
            </View>
            {project.keyFeatures ? (
              <BulletList text={project.keyFeatures} />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

function EducationSection({ data }: { data: ResumePdfData }) {
  if (!sectionHasPdfContent("education", data)) return null;

  return (
    <View style={s.section}>
      <PdfSectionTitle title={SECTION_REGISTRY.education.previewTitle} />
      {data.educations.map((edu, index) => {
        const dateRange = formatDateRange(
          edu.startDate,
          edu.endDate,
          edu.currentlyTaking
        );
        const institute = edu.institute.trim();
        const degree = edu.degree.trim();

        return (
          <View key={index} style={s.entry}>
            <View style={s.entryHeader} wrap={false}>
              <Text style={s.entryPrimary}>
                {institute || degree || "Education"}
              </Text>
              {dateRange ? <Text style={s.entryDate}>{dateRange}</Text> : null}
            </View>
            {institute && degree ? (
              <Text style={s.entryRole}>{degree}</Text>
            ) : null}
            {edu.gpa.trim() ? (
              <Text style={s.entryExtra}>GPA: {edu.gpa}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

function SkillsSection({ data }: { data: ResumePdfData }) {
  if (!sectionHasPdfContent("skill", data)) return null;

  return (
    <View style={s.section}>
      <PdfSectionTitle title={SECTION_REGISTRY.skill.previewTitle} />
      <View style={s.skillList}>
        {data.skills.map((skill, index) => (
          <View key={index} style={s.skillItem}>
            <Text style={s.bullet}>•</Text>
            <Text style={s.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const SECTION_COMPONENTS: Record<
  SectionKey,
  React.ComponentType<{ data: ResumePdfData }>
> = {
  experience: ExperienceSection,
  project: ProjectSection,
  education: EducationSection,
  skill: SkillsSection,
};

function PdfColumn({
  data,
  column,
}: {
  data: ResumePdfData;
  column: "main" | "sidebar";
}) {
  const sections = data.sections.filter((section) => section.column === column);

  return (
    <>
      {sections.map(({ key }) => {
        if (!sectionHasPdfContent(key, data)) return null;
        const Section = SECTION_COMPONENTS[key];
        return <Section key={key} data={data} />;
      })}
    </>
  );
}

export function ResumePdfDocument({ data }: { data: ResumePdfData }) {
  const hasMain = data.sections.some(
    (section) =>
      section.column === "main" && sectionHasPdfContent(section.key, data)
  );
  const hasSidebar = data.sections.some(
    (section) =>
      section.column === "sidebar" && sectionHasPdfContent(section.key, data)
  );

  return (
    <Document
      title={`${data.basicInfo.fullName || "Resume"} - Resume`}
      author={data.basicInfo.fullName || undefined}
      subject="Resume"
    >
      <Page size="A4" style={s.page}>
        <PdfHeader data={data} />

        {hasMain && hasSidebar ? (
          <View style={s.columns}>
            <View style={s.mainColumn}>
              <PdfColumn data={data} column="main" />
            </View>
            <View style={s.sidebarColumn}>
              <PdfColumn data={data} column="sidebar" />
            </View>
          </View>
        ) : (
          <>
            <PdfColumn data={data} column="main" />
            <PdfColumn data={data} column="sidebar" />
          </>
        )}
      </Page>
    </Document>
  );
}

export default ResumePdfDocument;
