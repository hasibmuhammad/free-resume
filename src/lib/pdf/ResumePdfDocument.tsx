import {
  Document,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  displayLink,
  formatEducationLine,
  formatPdfDateRange,
  normalizeUrl,
} from "@/lib/format";
import { SECTION_REGISTRY } from "@/lib/sectionConfig";
import { SectionKey } from "@/types/resume";
import { sectionHasPdfContent } from "./buildResumePdfData";
import { registerPdfFonts, PDF_COLORS as c } from "./fonts";
import {
  PdfEmailIcon,
  PdfGithubIcon,
  PdfLinkedinIcon,
  PdfLocationIcon,
  PdfPhoneIcon,
} from "./icons";
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
      <Text style={s.sectionTitle}>{title.toUpperCase()}</Text>
    </View>
  );
}

function ContactSeparator() {
  return <Text style={s.contactSeparator}>·</Text>;
}

type ContactKind = "email" | "phone" | "github" | "linkedin" | "location";

function ContactIcon({ kind }: { kind: ContactKind }) {
  const props = { color: c.icon, size: 9 };

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

function PdfHeader({ data }: { data: ResumePdfData }) {
  const { basicInfo } = data;
  const designation = basicInfo.designation.trim();

  const contactItems: {
    kind: ContactKind;
    label: string;
    href?: string;
  }[] = [];

  if (basicInfo.phone) {
    contactItems.push({ kind: "phone", label: basicInfo.phone });
  }
  if (basicInfo.email) {
    contactItems.push({ kind: "email", label: basicInfo.email });
  }
  if (basicInfo.linkedin) {
    const href = normalizeUrl(basicInfo.linkedin);
    contactItems.push({
      kind: "linkedin",
      label: displayLink(basicInfo.linkedin),
      href,
    });
  }
  if (basicInfo.location) {
    contactItems.push({ kind: "location", label: basicInfo.location });
  }
  if (basicInfo.github) {
    const href = normalizeUrl(basicInfo.github);
    contactItems.push({
      kind: "github",
      label: displayLink(basicInfo.github),
      href,
    });
  }

  return (
    <View style={s.header}>
      <View style={s.nameBlock}>
        <Text style={s.name}>{basicInfo.fullName || "Your Name"}</Text>
      </View>

      {designation ? (
        <View style={s.designationBlock}>
          <Text style={s.designation}>{designation}</Text>
        </View>
      ) : null}

      {contactItems.length > 0 ? (
        <View style={s.contactRow}>
          {contactItems.map((item, index) => (
            <View key={`${item.label}-${index}`} style={s.contactItemWrap} wrap={false}>
              <View style={s.contactIcon}>
                <ContactIcon kind={item.kind} />
              </View>
              {item.href ? (
                <Link src={item.href} style={s.contactLink}>
                  {item.label}
                </Link>
              ) : (
                <Text style={s.contactItem}>{item.label}</Text>
              )}
              {index < contactItems.length - 1 ? (
                <ContactSeparator />
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
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

function ExperienceSection({ data }: { data: ResumePdfData }) {
  if (!sectionHasPdfContent("experience", data)) return null;

  return (
    <View style={s.section}>
      <PdfSectionTitle title={SECTION_REGISTRY.experience.pdfTitle} />
      {data.experiences.map((exp, index) => {
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
          <View key={index} style={s.entry}>
            <Text style={s.entryPrimary}>{role || company || "Experience"}</Text>
            {company && role ? <Text style={s.entryAccent}>{company}</Text> : null}
            {meta ? <Text style={s.entryMeta}>{meta}</Text> : null}
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
      <PdfSectionTitle title={SECTION_REGISTRY.project.pdfTitle} />
      {data.projects.map((project, index) => {
        const dateRange = formatPdfDateRange(
          project.startDate,
          project.endDate,
          project.currentlyWorking
        );

        return (
          <View key={index} style={s.entry}>
            <View style={s.entryHeader} wrap={false}>
              <Text style={s.entryHeaderTitle}>{project.projectTitle}</Text>
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
      <PdfSectionTitle title={SECTION_REGISTRY.education.pdfTitle} />
      {data.educations.map((edu, index) => {
        const dateRange = formatPdfDateRange(
          edu.startDate,
          edu.endDate,
          edu.currentlyTaking
        );
        const institute = edu.institute.trim();
        const degreeLine = formatEducationLine(edu.degree, edu.gpa);

        return (
          <View key={index} style={s.entry}>
            <Text style={s.entryPrimary}>
              {degreeLine || institute || "Education"}
            </Text>
            {institute && degreeLine ? (
              <Text style={s.entryAccent}>{institute}</Text>
            ) : null}
            {dateRange ? <Text style={s.entryMeta}>{dateRange}</Text> : null}
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
      <PdfSectionTitle title={SECTION_REGISTRY.skill.pdfTitle} />
      <View style={s.skillTags}>
        {data.skills.map((skill, index) => (
          <View key={index} style={s.skillTag}>
            <Text style={s.skillTagText}>{skill}</Text>
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
  const summary = data.basicInfo.summary.trim();
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
        <View style={s.pageBody}>
          <PdfHeader data={data} />

          {hasMain && hasSidebar ? (
            <View style={s.columns}>
              <View style={s.mainColumn}>
                {summary ? <SummarySection summary={summary} /> : null}
                <PdfColumn data={data} column="main" />
              </View>
              <View style={s.sidebarColumn}>
                <PdfColumn data={data} column="sidebar" />
              </View>
            </View>
          ) : (
            <>
              {summary ? <SummarySection summary={summary} /> : null}
              <PdfColumn data={data} column="main" />
              <PdfColumn data={data} column="sidebar" />
            </>
          )}
        </View>
      </Page>
    </Document>
  );
}

export default ResumePdfDocument;
