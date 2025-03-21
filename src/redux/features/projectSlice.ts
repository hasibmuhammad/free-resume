import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateValueType } from "react-tailwindcss-datepicker";

interface ProjectItem {
  projectTitle: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  keyFeatures: string;
}

interface ProjectState {
  projects: ProjectItem[];
}

const initialState: ProjectState = {
  projects: [
    {
      projectTitle: "",
      currentlyWorking: false,
      startDate: { startDate: null, endDate: null },
      endDate: { startDate: null, endDate: null },
      keyFeatures: "",
    },
  ],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state) => {
      state.projects.push({
        projectTitle: "",
        currentlyWorking: false,
        startDate: { startDate: null, endDate: null },
        endDate: { startDate: null, endDate: null },
        keyFeatures: "",
      });
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1);
    },
    updateProject: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ProjectItem;
        value: string | boolean | DateValueType; // Explicitly define the possible types
      }>
    ) => {
      const { index, field, value } = action.payload;
      state.projects[index][field] = value as never; // Use type assertion if necessary
    },
    moveProject: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      const [removed] = state.projects.splice(index, 1);
      if (direction === "up" && index > 0) {
        state.projects.splice(index - 1, 0, removed);
      } else if (direction === "down" && index < state.projects.length - 1) {
        state.projects.splice(index + 1, 0, removed);
      }
    },
  },
});

export const { addProject, removeProject, updateProject, moveProject } =
  projectSlice.actions;

export default projectSlice.reducer;
