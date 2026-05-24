import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateValueType } from "react-tailwindcss-datepicker";
import { hydrateResume } from "@/redux/actions/hydrateResume";
import { EMPTY_DATE, ProjectItem } from "@/types/resume";

interface ProjectState {
  projects: ProjectItem[];
}

const createEmptyProject = (): ProjectItem => ({
  projectTitle: "",
  currentlyWorking: false,
  startDate: EMPTY_DATE,
  endDate: EMPTY_DATE,
  keyFeatures: "",
});

const initialState: ProjectState = {
  projects: [createEmptyProject()],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state) => {
      state.projects.push(createEmptyProject());
    },
    removeProject: (state, action: PayloadAction<number>) => {
      if (state.projects.length > 1) {
        state.projects.splice(action.payload, 1);
      }
    },
    updateProject: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ProjectItem;
        value: string | boolean | DateValueType;
      }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.projects[index]) {
        (state.projects[index][field] as typeof value) = value;
      }
    },
    moveProject: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.projects.length) return;

      [state.projects[index], state.projects[targetIndex]] = [
        state.projects[targetIndex],
        state.projects[index],
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateResume, (_state, action) => action.payload.project);
  },
});

export const { addProject, removeProject, updateProject, moveProject } =
  projectSlice.actions;

export default projectSlice.reducer;
