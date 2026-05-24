import { BasicInfo } from "@/types/resume";
import { displayLink, normalizeUrl } from "@/lib/format";
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

function ContactItem({
  icon,
  children,
  href,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}) {
  const className =
    "flex items-center gap-1.5 text-xs text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <span className={className}>
      {icon}
      <span>{children}</span>
    </span>
  );
}

export function PreviewHeader({ basicInfo }: PreviewHeaderProps) {
  const hasContact =
    basicInfo.email ||
    basicInfo.phone ||
    basicInfo.location ||
    basicInfo.github ||
    basicInfo.linkedin;

  return (
    <header className="mb-6 pb-4">
      <h1 className="text-2xl font-bold tracking-tight text-sky-600 dark:text-sky-400">
        {basicInfo.fullName || "Your Name"}
      </h1>
      {(basicInfo.designation || basicInfo.summary) && (
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {basicInfo.designation || basicInfo.summary}
        </p>
      )}

      {hasContact && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {basicInfo.email && (
            <ContactItem icon={<FaEnvelope className="text-slate-400 dark:text-slate-500" />}>
              {basicInfo.email}
            </ContactItem>
          )}
          {basicInfo.phone && (
            <ContactItem icon={<FaPhone className="text-slate-400 dark:text-slate-500" />}>
              {basicInfo.phone}
            </ContactItem>
          )}
          {basicInfo.location && (
            <ContactItem icon={<FaMapMarkerAlt className="text-slate-400 dark:text-slate-500" />}>
              {basicInfo.location}
            </ContactItem>
          )}
          {basicInfo.github && (
            <ContactItem
              icon={<FaGithub className="text-slate-400 dark:text-slate-500" />}
              href={normalizeUrl(basicInfo.github)}
            >
              {displayLink(basicInfo.github)}
            </ContactItem>
          )}
          {basicInfo.linkedin && (
            <ContactItem
              icon={<FaLinkedin className="text-slate-400 dark:text-slate-500" />}
              href={normalizeUrl(basicInfo.linkedin)}
            >
              {displayLink(basicInfo.linkedin)}
            </ContactItem>
          )}
        </div>
      )}

      {basicInfo.summary && basicInfo.designation && (
        <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {basicInfo.summary}
        </p>
      )}
    </header>
  );
}
