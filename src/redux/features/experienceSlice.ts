import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateValueType } from "react-tailwindcss-datepicker";
import { hydrateResume } from "@/redux/actions/hydrateResume";
import { EMPTY_DATE, ExperienceItem } from "@/types/resume";

interface ExperienceState {
  experiences: ExperienceItem[];
}

const createEmptyExperience = (): ExperienceItem => ({
  companyName: "",
  jobTitle: "",
  location: "",
  currentlyWorking: false,
  startDate: EMPTY_DATE,
  endDate: EMPTY_DATE,
  accomplishments: "",
});

const initialState: ExperienceState = {
  experiences: [createEmptyExperience()],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience: (state) => {
      state.experiences.push(createEmptyExperience());
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      if (state.experiences.length > 1) {
        state.experiences.splice(action.payload, 1);
      }
    },
    updateExperience: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ExperienceItem;
        value: string | boolean | DateValueType;
      }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.experiences[index]) {
        (state.experiences[index][field] as typeof value) = value;
      }
    },
    moveExperience: (
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
    ) => {
      const { index, direction } = action.payload;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.experiences.length) return;

      [state.experiences[index], state.experiences[targetIndex]] = [
        state.experiences[targetIndex],
        state.experiences[index],
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateResume, (_state, action) => action.payload.experience);
  },
});

export const {
  addExperience,
  removeExperience,
  updateExperience,
  moveExperience,
} = experienceSlice.actions;

export default experienceSlice.reducer;
