"use client";

import { useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { applyTemplate } from "@/redux/actions/applyTemplate";
import {
  draftHasPersistableState,
  loadResumeDraft,
} from "@/lib/resumeDraft";
import { isResumeTemplateId } from "@/lib/templates/registry";
import { useAppDispatch } from "@/redux/hooks";

export function TemplateInitializer() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const draft = loadResumeDraft();
    if (draft && draftHasPersistableState(draft)) return;

    const templateParam = searchParams.get("template");
    if (templateParam && isResumeTemplateId(templateParam)) {
      dispatch(applyTemplate(templateParam));
    }
  }, [dispatch, searchParams]);

  return null;
}
