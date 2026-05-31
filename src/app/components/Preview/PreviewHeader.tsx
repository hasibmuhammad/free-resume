import { BasicInfo } from "@/types/resume";
import { displayLink, normalizeUrl } from "@/lib/format";
import {
  RESUME_LAYOUT,
  RESUME_THEME,
  RESUME_TYPOGRAPHY,
} from "@/lib/resumeTheme";
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

function ContactItem({
  icon,
  children,
  href,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}) {
  const baseStyle = {
    color: RESUME_THEME.textLight,
    fontSize: 9,
    lineHeight: RESUME_TYPOGRAPHY.lineHeight.contact,
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

function ContactSeparator() {
  return (
    <span
      className="select-none"
      style={{
        color: RESUME_THEME.border,
        fontSize: 9,
        marginLeft: 7,
        marginRight: 7,
      }}
      aria-hidden
    >
      ·
    </span>
  );
}

export function PreviewHeader({ basicInfo }: PreviewHeaderProps) {
  const designation = basicInfo.designation.trim();

  const contactItems: {
    icon: React.ReactNode;
    label: string;
    href?: string;
  }[] = [];

  if (basicInfo.phone) {
    contactItems.push({
      icon: <FaPhone style={{ color: RESUME_THEME.icon, fontSize: 9 }} />,
      label: basicInfo.phone,
    });
  }
  if (basicInfo.email) {
    contactItems.push({
      icon: <FaEnvelope style={{ color: RESUME_THEME.icon, fontSize: 9 }} />,
      label: basicInfo.email,
    });
  }
  if (basicInfo.linkedin) {
    contactItems.push({
      icon: <FaLinkedin style={{ color: RESUME_THEME.icon, fontSize: 9 }} />,
      label: displayLink(basicInfo.linkedin),
      href: normalizeUrl(basicInfo.linkedin),
    });
  }
  if (basicInfo.location) {
    contactItems.push({
      icon: <FaMapMarkerAlt style={{ color: RESUME_THEME.icon, fontSize: 9 }} />,
      label: basicInfo.location,
    });
  }
  if (basicInfo.github) {
    contactItems.push({
      icon: <FaGithub style={{ color: RESUME_THEME.icon, fontSize: 9 }} />,
      label: displayLink(basicInfo.github),
      href: normalizeUrl(basicInfo.github),
    });
  }

  return (
    <header style={{ marginBottom: S.headerBottom }}>
      <h1
        className="font-bold tracking-tight"
        style={{
          fontSize: 22,
          lineHeight: RESUME_TYPOGRAPHY.lineHeight.heading,
          color: RESUME_THEME.primary,
        }}
      >
        {basicInfo.fullName || "Your Name"}
      </h1>

      {designation ? (
        <p
          className="font-semibold"
          style={{
            fontSize: 10,
            lineHeight: RESUME_TYPOGRAPHY.lineHeight.body,
            marginTop: S.nameBottom,
            color: RESUME_THEME.secondary,
          }}
        >
          {designation}
        </p>
      ) : null}

      {contactItems.length > 0 ? (
        <div
          className="flex flex-wrap items-center"
          style={{ marginTop: S.contactTop, rowGap: 4 }}
        >
          {contactItems.map((item, index) => (
            <span
              key={`${item.label}-${index}`}
              className="inline-flex max-w-full shrink-0 items-center"
            >
              <ContactItem icon={item.icon} href={item.href}>
                {item.label}
              </ContactItem>
              {index < contactItems.length - 1 ? <ContactSeparator /> : null}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
