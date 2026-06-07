import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateValueType } from "react-tailwindcss-datepicker";
import { hydrateResume } from "@/redux/actions/hydrateResume";
import { EMPTY_DATE, EducationItem } from "@/types/resume";

interface EducationState {
  educations: EducationItem[];
}

const createEmptyEducation = (): EducationItem => ({
  degree: "",
  gpa: "",
  institute: "",
  currentlyTaking: false,
  startDate: EMPTY_DATE,
  endDate: EMPTY_DATE,
  achievements: "",
});

const initialState: EducationState = {
  educations: [createEmptyEducation()],
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state) => {
      state.educations.push(createEmptyEducation());
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      if (state.educations.length > 1) {
        state.educations.splice(action.payload, 1);
      }
    },
    updateEducation: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof EducationItem;
        value: string | boolean | DateValueType;
      }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.educations[index]) {
        (state.educations[index][field] as typeof value) = value;
      }
    },
    moveEducation: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.educations.length) return;

      [state.educations[index], state.educations[targetIndex]] = [
        state.educations[targetIndex],
        state.educations[index],
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateResume, (_state, action) => ({
      educations: action.payload.education.educations.map((edu) => ({
        ...createEmptyEducation(),
        ...edu,
      })),
    }));
  },
});

export const { addEducation, removeEducation, updateEducation, moveEducation } =
  educationSlice.actions;

export default educationSlice.reducer;
