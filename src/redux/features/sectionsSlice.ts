import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Section {
  key: string;
  title: string;
}

interface SectionsState {
  sections: Section[];
  visibility: { [key: string]: boolean };
}

const initialState: SectionsState = {
  sections: [
    { key: "experience", title: "Experience" },
    { key: "project", title: "Project" },
    { key: "education", title: "Education" },
    { key: "skill", title: "Skill" },
  ],
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
    toggleVisibility: (state, action: PayloadAction<string>) => {
      state.visibility[action.payload] = !state.visibility[action.payload];
    },
    moveSection: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      if (direction === "up" && index > 0) {
        [state.sections[index], state.sections[index - 1]] = [
          state.sections[index - 1],
          state.sections[index],
        ];
      } else if (direction === "down" && index < state.sections.length - 1) {
        [state.sections[index], state.sections[index + 1]] = [
          state.sections[index + 1],
          state.sections[index],
        ];
      }
    },
  },
});

export const { toggleVisibility, moveSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
