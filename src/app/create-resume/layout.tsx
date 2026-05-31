import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Create Your Resume — Free Online Editor",
  description:
    "Build your resume with our free online editor. Live preview, auto-save, ATS checker, and one-click PDF download. Add experience, skills, education, and projects.",
  path: "/create-resume",
});

export default function CreateResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      {children}
    </div>
  );
}
