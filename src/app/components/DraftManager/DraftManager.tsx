"use client";

import { loadResumeDraft, resumeDraftHasContent } from "@/lib/resumeDraft";
import { markSaved } from "@/redux/features/draftSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hydrateResume } from "@/redux/store";
import { useLayoutEffect, useEffect } from "react";
import { setHydrated } from "@/redux/features/draftSlice";

export function DraftManager() {
  const dispatch = useAppDispatch();
  const hasUnsavedChanges = useAppSelector(
    (state) => state.draft.hasUnsavedChanges
  );
  const isHydrated = useAppSelector((state) => state.draft.isHydrated);

  useLayoutEffect(() => {
    const draft = loadResumeDraft();
    if (draft && resumeDraftHasContent(draft)) {
      dispatch(hydrateResume(draft));
      dispatch(markSaved(draft.savedAt));
    }
    dispatch(setHydrated());
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue =
        "You have unsaved changes. They may be lost if you leave now.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, isHydrated]);

  return null;
}
