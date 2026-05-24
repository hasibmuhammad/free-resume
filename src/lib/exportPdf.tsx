import { ResumePdfData } from "./pdf/types";

export function sanitizePdfFilename(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned || "resume";
}

export function downloadPdfBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportResumeToPdf(
  data: ResumePdfData,
  filename: string
): Promise<void> {
  const [{ pdf }, { default: ResumePdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./pdf/ResumePdfDocument"),
  ]);

  const blob = await pdf(<ResumePdfDocument data={data} />).toBlob();
  downloadPdfBlob(blob, filename);
}
