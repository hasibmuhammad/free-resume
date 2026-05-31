import { DEFAULT_SECTION_ORDER, SECTION_REGISTRY } from "@/lib/sectionConfig";
import { hydrateResume } from "@/redux/actions/hydrateResume";
import { ResumeSection, SectionKey } from "@/types/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      if (!current) return;

      const column = current.column;
      let targetIndex = index;

      if (direction === "up") {
        for (let i = index - 1; i >= 0; i--) {
          if (state.sections[i]?.column === column) {
            targetIndex = i;
            break;
          }
        }
      } else {
        for (let i = index + 1; i < state.sections.length; i++) {
          if (state.sections[i]?.column === column) {
            targetIndex = i;
            break;
          }
        }
      }

      if (targetIndex === index) return;

      [state.sections[index], state.sections[targetIndex]] = [
        state.sections[targetIndex],
        state.sections[index],
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateResume, (_state, action) => {
      const hydrated = action.payload.sections;
      return {
        ...hydrated,
        sections: hydrated.sections.map((section) => ({
          ...SECTION_REGISTRY[section.key],
          ...section,
        })),
      };
    });
  },
});

export const { toggleVisibility, moveSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
