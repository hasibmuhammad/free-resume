import { ReactNode } from "react";
import { RESUME_LAYOUT, RESUME_THEME, RESUME_TYPOGRAPHY } from "@/lib/resumeTheme";

const S = RESUME_LAYOUT.spacing;
const LH = RESUME_TYPOGRAPHY.lineHeight.body;

interface PreviewSectionBlockProps {
  title: string;
  children: ReactNode;
}

export function PreviewSectionBlock({ title, children }: PreviewSectionBlockProps) {
  return (
    <section className="last:mb-0" style={{ marginBottom: S.sectionBottom }}>
      <div
        className="pb-1"
        style={{
          marginBottom: S.sectionTitleBottom,
          borderBottom: `1px solid ${RESUME_THEME.borderStrong}`,
        }}
      >
        <h2
          className="font-bold uppercase"
          style={{
            fontSize: 9,
            letterSpacing: "0.14em",
            color: RESUME_THEME.sectionTitle,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

interface PreviewEntryProps {
  title: string;
  titleAccent?: string;
  meta?: string;
  titleDate?: string;
  details?: string;
}

export function PreviewEntry({
  title,
  titleAccent,
  meta,
  titleDate,
  details,
}: PreviewEntryProps) {
  return (
    <div style={{ marginBottom: S.entryBottom }}>
      {titleDate ? (
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-bold" style={{ fontSize: 10.5, lineHeight: 1.35, color: RESUME_THEME.primary }}>
            {title}
          </h3>
          <span
            className="shrink-0 whitespace-nowrap"
            style={{ fontSize: 9, lineHeight: 1.35, color: RESUME_THEME.textLight }}
          >
            {titleDate}
          </span>
        </div>
      ) : (
        <h3 className="font-bold" style={{ fontSize: 10.5, lineHeight: 1.35, color: RESUME_THEME.primary }}>
          {title}
        </h3>
      )}

      {titleAccent ? (
        <p
          className="font-semibold"
          style={{
            fontSize: 10,
            lineHeight: 1.35,
            marginTop: S.titleToAccent,
            color: RESUME_THEME.secondary,
          }}
        >
          {titleAccent}
        </p>
      ) : null}

      {meta ? (
        <p
          style={{
            fontSize: 9,
            lineHeight: 1.35,
            marginTop: S.accentToMeta,
            color: RESUME_THEME.textLight,
          }}
        >
          {meta}
        </p>
      ) : null}

      {details ? (
        <p
          className="whitespace-pre-line"
          style={{
            fontSize: 9.5,
            lineHeight: LH,
            marginTop: S.metaToDetails,
            color: RESUME_THEME.textMuted,
          }}
        >
          {details}
        </p>
      ) : null}
    </div>
  );
}

interface PreviewSummaryProps {
  text: string;
}

export function PreviewSummary({ text }: PreviewSummaryProps) {
  return (
    <PreviewSectionBlock title="Summary">
      <p style={{ fontSize: 10, lineHeight: LH, color: RESUME_THEME.textMuted }}>
        {text}
      </p>
    </PreviewSectionBlock>
  );
}

export function PreviewSkills({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap" style={{ gap: "6px 12px" }}>
      {skills.map((skill, index) => (
        <span
          key={`${skill}-${index}`}
          className="inline-block border-b pb-px"
          style={{
            fontSize: 9.5,
            lineHeight: 1.35,
            color: RESUME_THEME.textMuted,
            borderColor: RESUME_THEME.skillUnderline,
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
