import { parseResumeFromPdfBlob } from "@/lib/parse-resume-from-pdf";
import { parsedResumeToDraft } from "@/lib/parsedResumeToDraft";
import { resumeDraftHasContent } from "@/lib/resumeDraft";
import { ResumeDraft } from "@/types/resumeDraft";

export interface ImportResumeResult {
  draft: ResumeDraft;
  isMultiColumn: boolean;
  lineCount: number;
}

export async function importResumeFromPdfFile(
  file: File
): Promise<ImportResumeResult> {
  if (
    file.type !== "application/pdf" &&
    !file.name.toLowerCase().endsWith(".pdf")
  ) {
    throw new Error("Please upload a PDF resume.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("PDF must be smaller than 10 MB.");
  }

  const { resume, lineCount, isMultiColumn } = await parseResumeFromPdfBlob(file);
  const draft = parsedResumeToDraft(resume);

  if (!resumeDraftHasContent(draft)) {
    throw new Error(
      "We couldn't read enough text from this PDF. Try a machine-readable PDF (not a scanned image)."
    );
  }

  return { draft, isMultiColumn, lineCount };
}
