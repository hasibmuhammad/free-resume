import {
  RESUME_LAYOUT,
  RESUME_THEME,
  RESUME_TYPOGRAPHY,
} from "@/lib/resumeTheme";
import { ReactNode } from "react";

const S = RESUME_LAYOUT.spacing;
const T = RESUME_TYPOGRAPHY;
const LH = T.lineHeight.body;

interface PreviewSectionBlockProps {
  title: string;
  children: ReactNode;
  keepTogether?: boolean;
}

export function PreviewSectionBlock({
  title,
  children,
  keepTogether = false,
}: PreviewSectionBlockProps) {
  return (
    <section
      className={`last:mb-0${keepTogether ? " preview-flow-block" : ""}`}
      style={{ marginBottom: S.sectionBottom }}
    >
      <div
        className="preview-section-title"
        style={{
          marginBottom: S.sectionTitleBottom,
          paddingBottom: 2,
          borderBottom: `1px solid ${RESUME_THEME.borderStrong}`,
        }}
      >
        <h2
          className="font-bold uppercase"
          style={{
            fontSize: T.fontSize.sectionTitle,
            letterSpacing: `${T.letterSpacing.sectionTitle}px`,
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
    <div className="preview-flow-block" style={{ marginBottom: S.entryBottom }}>
      {titleDate ? (
        <>
          <h3
            className="font-bold break-words"
            style={{ fontSize: T.fontSize.entryTitle, lineHeight: T.lineHeight.entry, color: RESUME_THEME.primary }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: T.fontSize.meta,
              lineHeight: T.lineHeight.entry,
              marginTop: S.titleToAccent,
              color: RESUME_THEME.textLight,
            }}
          >
            {titleDate}
          </p>
        </>
      ) : (
        <h3 className="font-bold" style={{ fontSize: T.fontSize.entryTitle, lineHeight: T.lineHeight.entry, color: RESUME_THEME.primary }}>
          {title}
        </h3>
      )}

      {titleAccent ? (
        <p
          className="font-semibold"
          style={{
            fontSize: T.fontSize.entryAccent,
            lineHeight: T.lineHeight.entry,
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
            fontSize: T.fontSize.meta,
            lineHeight: T.lineHeight.entry,
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
            fontSize: T.fontSize.bullet,
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
    <PreviewSectionBlock title="Summary" keepTogether>
      <p style={{ fontSize: T.fontSize.body, lineHeight: LH, color: RESUME_THEME.textMuted }}>
        {text}
      </p>
    </PreviewSectionBlock>
  );
}

export function PreviewSkills({ skills }: { skills: string[] }) {
  return (
    <div
      className="preview-flow-block flex flex-wrap"
      style={{ gap: `${S.skillTagGapY}px ${S.skillTagGapX}px` }}
    >
      {skills.map((skill, index) => (
        <span
          key={`${skill}-${index}`}
          className="inline-block border-b pb-px"
          style={{
            fontSize: T.fontSize.skill,
            lineHeight: T.lineHeight.entry,
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
