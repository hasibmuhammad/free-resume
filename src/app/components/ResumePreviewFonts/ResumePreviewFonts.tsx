import { RESUME_GOOGLE_FONTS_URL } from "@/lib/templates/fontPresets";

export function ResumePreviewFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link href={RESUME_GOOGLE_FONTS_URL} rel="stylesheet" />
    </>
  );
}
