"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useStore } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { buildResumePdfData } from "@/lib/pdf/buildResumePdfData";
import { isResumeEmpty } from "@/lib/resumeDraft";
import { exportResumeToPdf, sanitizePdfFilename } from "@/lib/exportPdf";

export function DownloadPdfButton() {
  const store = useStore<RootState>();
  const fullName = useAppSelector((state) => state.basicInfo.fullName);
  const isEmpty = useAppSelector(isResumeEmpty);
  const [exporting, setExporting] = useState(false);

  const handleDownload = useCallback(async () => {
    if (isEmpty || exporting) return;

    setExporting(true);
    try {
      const data = buildResumePdfData(store.getState());
      const filename = sanitizePdfFilename(fullName || "resume");
      await exportResumeToPdf(data, filename);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setExporting(false);
    }
  }, [exporting, fullName, isEmpty, store]);

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isEmpty || exporting}
      className="btn-primary !gap-1.5 !rounded-lg !px-4 !py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-50"
      title={
        isEmpty
          ? "Add resume details before downloading"
          : "Download your resume as PDF"
      }
    >
      {exporting ? (
        <Loader2 aria-hidden className="h-3.5 w-3.5 animate-spin" strokeWidth={2.25} />
      ) : (
        <Download aria-hidden className="h-3.5 w-3.5" strokeWidth={2.25} />
      )}
      {exporting ? "Preparing…" : "Download"}
    </button>
  );
}
