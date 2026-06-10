"use client";

import { analyzeAtsFromPdf } from "@/lib/atsAnalyze";
import {
  AtsAnalysisStatus,
  AtsReport,
  EMPTY_ATS_REPORT,
} from "@/lib/atsScore";
import { buildResumePdfData } from "@/lib/pdf/buildResumePdfData";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";

const DEBOUNCE_MS = 900;

function selectEditorState(state: RootState) {
  return {
    basicInfo: state.basicInfo,
    experience: state.experience,
    education: state.education,
    project: state.project,
    skill: state.skill,
    sections: state.sections,
    template: state.template,
  };
}

export function useAtsReport(): {
  report: AtsReport;
  status: AtsAnalysisStatus;
  error: string | null;
} {
  const editorState = useAppSelector(selectEditorState, shallowEqual);

  const [report, setReport] = useState<AtsReport>(EMPTY_ATS_REPORT);
  const [status, setStatus] = useState<AtsAnalysisStatus>("analyzing");
  const [error, setError] = useState<string | null>(null);
  const runIdRef = useRef(0);

  useEffect(() => {
    const runId = ++runIdRef.current;
    setStatus("analyzing");
    setError(null);

    const timer = window.setTimeout(async () => {
      try {
        const pdfData = buildResumePdfData({
          ...editorState,
          draft: {} as RootState["draft"],
        } as RootState);

        const result = await analyzeAtsFromPdf(pdfData);
        if (runIdRef.current === runId) {
          setReport(result);
          setStatus("idle");
        }
      } catch (err) {
        if (runIdRef.current === runId) {
          setReport(EMPTY_ATS_REPORT);
          setStatus("error");
          setError(
            err instanceof Error ? err.message : "ATS analysis failed"
          );
        }
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [editorState]);

  return { report, status, error };
}
