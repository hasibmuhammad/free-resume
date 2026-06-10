import { RESUME_LAYOUT, RESUME_TYPOGRAPHY } from "@/lib/resumeTheme";
import { ReactNode } from "react";
import { usePreviewTheme } from "./PreviewThemeContext";

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
  const { colors } = usePreviewTheme();

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
          borderBottom: `1px solid ${colors.borderStrong}`,
        }}
      >
        <h2
          className="font-bold uppercase"
          style={{
            fontSize: T.fontSize.sectionTitle,
            letterSpacing: `${T.letterSpacing.sectionTitle}px`,
            color: colors.sectionTitle,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

interface PreviewBulletListProps {
  text: string;
}

function PreviewBulletList({ text }: PreviewBulletListProps) {
  const { colors } = usePreviewTheme();
  const lines = text
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  return (
    <ul
      className="list-none"
      style={{
        marginTop: S.metaToDetails,
        paddingLeft: RESUME_LAYOUT.bulletIndent,
      }}
    >
      {lines.map((line, index) => (
        <li
          key={index}
          className="flex"
          style={{
            marginBottom: index < lines.length - 1 ? S.bulletGap : 0,
          }}
        >
          <span
            aria-hidden
            style={{
              flexShrink: 0,
              width: 8,
              marginRight: 4,
              fontSize: T.fontSize.bullet,
              lineHeight: LH,
              color: colors.bullet,
            }}
          >
            •
          </span>
          <span
            style={{
              flex: 1,
              fontSize: T.fontSize.bullet,
              lineHeight: LH,
              color: colors.textMuted,
            }}
          >
            {line}
          </span>
        </li>
      ))}
    </ul>
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
  const { colors } = usePreviewTheme();

  return (
    <div className="preview-flow-block" style={{ marginBottom: S.entryBottom }}>
      {titleDate ? (
        <>
          <h3
            className="font-bold break-words"
            style={{
              fontSize: T.fontSize.entryTitle,
              lineHeight: T.lineHeight.entry,
              color: colors.primary,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: T.fontSize.meta,
              lineHeight: T.lineHeight.entry,
              marginTop: S.titleToAccent,
              color: colors.textLight,
            }}
          >
            {titleDate}
          </p>
        </>
      ) : (
        <h3
          className="font-bold"
          style={{
            fontSize: T.fontSize.entryTitle,
            lineHeight: T.lineHeight.entry,
            color: colors.primary,
          }}
        >
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
            color: colors.secondary,
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
            color: colors.textLight,
          }}
        >
          {meta}
        </p>
      ) : null}

      {details ? <PreviewBulletList text={details} /> : null}
    </div>
  );
}

interface PreviewSummaryProps {
  text: string;
}

export function PreviewSummary({ text }: PreviewSummaryProps) {
  const { colors } = usePreviewTheme();

  return (
    <PreviewSectionBlock title="Summary" keepTogether>
      <p
        style={{
          fontSize: T.fontSize.body,
          lineHeight: LH,
          color: colors.textMuted,
        }}
      >
        {text}
      </p>
    </PreviewSectionBlock>
  );
}

export function PreviewSkills({ skills }: { skills: string[] }) {
  const { colors } = usePreviewTheme();

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
            color: colors.textMuted,
            borderColor: colors.skillUnderline,
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
