import { createAction } from "@reduxjs/toolkit";
import { ResumeDraft } from "@/types/resumeDraft";

export const hydrateResume = createAction<ResumeDraft>("resume/hydrate");

export const RESUME_HYDRATE_ACTION = hydrateResume.type;
