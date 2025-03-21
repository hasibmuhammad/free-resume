import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateValueType } from "react-tailwindcss-datepicker";

interface ExperienceItem {
  companyName: string;
  jobTitle: string;
  location: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  present: string;
  accomplishments: string;
}

interface ExperienceState {
  experiences: ExperienceItem[];
}

const initialState: ExperienceState = {
  experiences: [
    {
      companyName: "",
      jobTitle: "",
      location: "",
      currentlyWorking: false,
      startDate: { startDate: null, endDate: null },
      endDate: { startDate: null, endDate: null },
      present: "",
      accomplishments: "",
    },
  ],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience: (state) => {
      state.experiences.push({
        companyName: "",
        jobTitle: "",
        location: "",
        currentlyWorking: false,
        startDate: { startDate: null, endDate: null },
        endDate: { startDate: null, endDate: null },
        present: "",
        accomplishments: "",
      });
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.experiences.splice(action.payload, 1);
    },
    updateExperience: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ExperienceItem;
        value: string | boolean | DateValueType; // Explicitly define the possible types
      }>
    ) => {
      const { index, field, value } = action.payload;
      state.experiences[index][field] = value as never; // Use type assertion if necessary
      if (field === "currentlyWorking") {
        state.experiences[index].present = value ? "Present" : "";
      }
    },
    moveExperience: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      const [removed] = state.experiences.splice(index, 1);
      if (direction === "up" && index > 0) {
        state.experiences.splice(index - 1, 0, removed);
      } else if (direction === "down" && index < state.experiences.length - 1) {
        state.experiences.splice(index + 1, 0, removed);
      }
    },
  },
});

export const {
  addExperience,
  removeExperience,
  updateExperience,
  moveExperience,
} = experienceSlice.actions;

export default experienceSlice.reducer;
