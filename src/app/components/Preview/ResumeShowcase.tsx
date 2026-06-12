"use client";

import { ResumeTemplateId } from "@/lib/templates/types";
import { StaticResumePreview } from "./StaticResumePreview";

const SHOWCASE_PAGE = "resume-showcase-page !shadow-none";

type ResumeShowcaseVariant = "hero" | "template" | "template-compact";

type ResumeShowcaseProps = {
  templateId: ResumeTemplateId;
  variant?: ResumeShowcaseVariant;
  className?: string;
};

export function ResumeShowcase({
  templateId,
  variant = "template",
  className = "",
}: ResumeShowcaseProps) {
  if (variant === "hero") {
    return (
      <div className={`resume-showcase-hero ${className}`.trim()}>
        <div className="resume-showcase-hero__ambient" aria-hidden />
        <div className="resume-showcase-hero__back" aria-hidden>
          <StaticResumePreview
            templateId={templateId}
            scale={0.54}
            pageClassName={SHOWCASE_PAGE}
          />
        </div>
        <div className="resume-showcase-hero__front">
          <StaticResumePreview
            templateId={templateId}
            scale={0.52}
            pageClassName={SHOWCASE_PAGE}
          />
        </div>
      </div>
    );
  }

  if (variant === "template-compact") {
    return (
      <div className={`resume-showcase-template-compact ${className}`.trim()}>
        <div className="resume-showcase-template-compact__inner">
          <StaticResumePreview
            templateId={templateId}
            scale={0.2}
            pageClassName={SHOWCASE_PAGE}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`resume-showcase-template ${className}`.trim()}>
      <div className="resume-showcase-template__inner">
        <StaticResumePreview
          templateId={templateId}
          scale={0.42}
          pageClassName={SHOWCASE_PAGE}
        />
      </div>
    </div>
  );
}
