import { createSlice } from "@reduxjs/toolkit";

interface DraftState {
  isHydrated: boolean;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
}

const initialState: DraftState = {
  isHydrated: false,
  hasUnsavedChanges: false,
  isSaving: false,
  lastSavedAt: null,
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setHydrated: (state) => {
      state.isHydrated = true;
    },
    markDirty: (state) => {
      state.hasUnsavedChanges = true;
    },
    markSaving: (state) => {
      state.isSaving = true;
    },
    markSaved: (state, action: { payload: string }) => {
      state.isSaving = false;
      state.hasUnsavedChanges = false;
      state.lastSavedAt = action.payload;
    },
  },
});

export const { setHydrated, markDirty, markSaving, markSaved } =
  draftSlice.actions;
export default draftSlice.reducer;
