import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_SECTION_ORDER, SECTION_REGISTRY } from "@/lib/sectionConfig";
import { hydrateResume } from "@/redux/actions/hydrateResume";
import { ResumeSection, SectionKey } from "@/types/resume";

interface SectionsState {
  sections: ResumeSection[];
  visibility: Record<SectionKey, boolean>;
}

const initialState: SectionsState = {
  sections: DEFAULT_SECTION_ORDER.map((key) => ({
    key,
    ...SECTION_REGISTRY[key],
  })),
  visibility: {
    experience: true,
    project: true,
    education: true,
    skill: true,
  },
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    toggleVisibility: (state, action: PayloadAction<SectionKey>) => {
      state.visibility[action.payload] = !state.visibility[action.payload];
    },
    moveSection: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      const current = state.sections[index];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const target = state.sections[targetIndex];

      if (!current || !target || current.column !== target.column) return;

      [state.sections[index], state.sections[targetIndex]] = [
        state.sections[targetIndex],
        state.sections[index],
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateResume, (_state, action) => action.payload.sections);
  },
});

export const { toggleVisibility, moveSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
