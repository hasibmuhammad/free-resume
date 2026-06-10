import { BasicInfo } from "@/types/resume";
import { buildContactFields } from "@/lib/contactFields";
import {
  RESUME_LAYOUT,
  RESUME_TYPOGRAPHY,
} from "@/lib/resumeTheme";
import { usePreviewTheme } from "./PreviewThemeContext";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

interface PreviewHeaderProps {
  basicInfo: BasicInfo;
}

const S = RESUME_LAYOUT.spacing;
const T = RESUME_TYPOGRAPHY;

function ContactItem({
  icon,
  children,
  href,
  textLight,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  textLight: string;
}) {
  const baseStyle = {
    color: textLight,
    fontSize: T.fontSize.contact,
    lineHeight: T.lineHeight.contact,
  };

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 no-underline hover:opacity-80"
        style={baseStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <span className="inline-flex items-center gap-1" style={baseStyle}>
      {content}
    </span>
  );
}

function ContactSeparator({ borderColor }: { borderColor: string }) {
  return (
    <span
      className="select-none"
      style={{
        color: borderColor,
        fontSize: T.fontSize.contact,
        marginLeft: S.contactSeparatorGap,
        marginRight: S.contactSeparatorGap,
      }}
      aria-hidden
    >
      ·
    </span>
  );
}

function contactIcon(
  kind: ReturnType<typeof buildContactFields>[number]["kind"],
  iconColor: string
) {
  const style = { color: iconColor, fontSize: T.fontSize.contact };

  switch (kind) {
    case "phone":
      return <FaPhone style={style} />;
    case "email":
      return <FaEnvelope style={style} />;
    case "location":
      return <FaMapMarkerAlt style={style} />;
    case "github":
      return <FaGithub style={style} />;
    case "linkedin":
      return <FaLinkedin style={style} />;
  }
}

export function PreviewHeader({ basicInfo }: PreviewHeaderProps) {
  const { colors } = usePreviewTheme();
  const designation = basicInfo.designation.trim();
  const contactItems = buildContactFields(basicInfo);

  return (
    <header style={{ marginBottom: S.headerBottom }}>
      <h1
        className="font-bold tracking-tight"
        style={{
          fontSize: T.fontSize.name,
          lineHeight: T.lineHeight.heading,
          color: colors.primary,
        }}
      >
        {basicInfo.fullName || "Your Name"}
      </h1>

      {designation ? (
        <p
          className="font-semibold"
          style={{
            fontSize: T.fontSize.designation,
            lineHeight: T.lineHeight.body,
            marginTop: S.nameBottom,
            color: colors.secondary,
          }}
        >
          {designation}
        </p>
      ) : null}

      {contactItems.length > 0 ? (
        <div
          className="flex flex-wrap items-center"
          style={{ marginTop: S.contactTop, rowGap: 2 }}
        >
          {contactItems.map((item, index) => (
            <span
              key={`${item.label}-${index}`}
              className="inline-flex max-w-full shrink-0 items-center"
            >
              <ContactItem
                icon={contactIcon(item.kind, colors.icon)}
                href={item.href}
                textLight={colors.textLight}
              >
                {item.label}
              </ContactItem>
              {index < contactItems.length - 1 ? (
                <ContactSeparator borderColor={colors.border} />
              ) : null}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
