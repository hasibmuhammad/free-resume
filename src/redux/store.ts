import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { hydrateResume, RESUME_HYDRATE_ACTION } from "./actions/hydrateResume";
import basicInfoReducer from "./features/basicInfoSlice";
import draftReducer, { markDirty, markSaved, markSaving } from "./features/draftSlice";
import educationReducer from "./features/educationSlice";
import experienceReducer from "./features/experienceSlice";
import projectReducer from "./features/projectSlice";
import sectionsReducer from "./features/sectionsSlice";
import skillReducer from "./features/skillSlice";
import { saveResumeDraft, isResumeEmpty, clearResumeDraft } from "@/lib/resumeDraft";

type RootState = {
  draft: ReturnType<typeof draftReducer>;
  sections: ReturnType<typeof sectionsReducer>;
  basicInfo: ReturnType<typeof basicInfoReducer>;
  experience: ReturnType<typeof experienceReducer>;
  education: ReturnType<typeof educationReducer>;
  project: ReturnType<typeof projectReducer>;
  skill: ReturnType<typeof skillReducer>;
};

const draftListener = createListenerMiddleware<RootState>();

const DRAFT_DEBOUNCE_MS = 600;

const SKIP_DRAFT_ACTIONS = new Set([
  RESUME_HYDRATE_ACTION,
  "draft/setHydrated",
  "draft/markDirty",
  "draft/markSaving",
  "draft/markSaved",
]);

draftListener.startListening({
  predicate: (action) => !SKIP_DRAFT_ACTIONS.has(action.type),
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(markDirty());
    listenerApi.dispatch(markSaving());

    listenerApi.cancelActiveListeners();
    await listenerApi.delay(DRAFT_DEBOUNCE_MS);

    const state = listenerApi.getState();

    if (isResumeEmpty(state)) {
      clearResumeDraft();
    } else {
      saveResumeDraft(state);
    }

    listenerApi.dispatch(markSaved(new Date().toISOString()));
  },
});

export const store = configureStore({
  reducer: {
    draft: draftReducer,
    sections: sectionsReducer,
    basicInfo: basicInfoReducer,
    experience: experienceReducer,
    education: educationReducer,
    project: projectReducer,
    skill: skillReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(draftListener.middleware),
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;

export { hydrateResume };
