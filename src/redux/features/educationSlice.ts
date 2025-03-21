import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateValueType } from "react-tailwindcss-datepicker";

interface EducationItem {
  degree: string;
  currentlyTaking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  institute: string;
}

interface EducationState {
  educations: EducationItem[];
}

const initialState: EducationState = {
  educations: [
    {
      degree: "",
      currentlyTaking: false,
      startDate: { startDate: null, endDate: null },
      endDate: { startDate: null, endDate: null },
      institute: "",
    },
  ],
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state) => {
      state.educations.push({
        degree: "",
        currentlyTaking: false,
        startDate: { startDate: null, endDate: null },
        endDate: { startDate: null, endDate: null },
        institute: "",
      });
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.educations.splice(action.payload, 1);
    },
    updateEducation: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof EducationItem;
        value: string | boolean | DateValueType; // Explicitly define the possible types
      }>
    ) => {
      const { index, field, value } = action.payload;
      state.educations[index][field] = value as never; // Use type assertion if necessary
    },
    moveEducation: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      const [removed] = state.educations.splice(index, 1);
      if (direction === "up" && index > 0) {
        state.educations.splice(index - 1, 0, removed);
      } else if (direction === "down" && index < state.educations.length - 1) {
        state.educations.splice(index + 1, 0, removed);
      }
    },
  },
});

export const { addEducation, removeEducation, updateEducation, moveEducation } =
  educationSlice.actions;

export default educationSlice.reducer;
