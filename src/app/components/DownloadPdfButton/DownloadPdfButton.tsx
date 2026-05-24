"use client";

import { useCallback, useState } from "react";
import { FaDownload } from "react-icons/fa";
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
      className="btn-secondary !px-3 !py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-50"
      title={
        isEmpty
          ? "Add resume details before downloading"
          : "Download resume as PDF"
      }
    >
      <FaDownload className="h-3 w-3" aria-hidden />
      {exporting ? "Generating…" : "Download PDF"}
    </button>
  );
}
