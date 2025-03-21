import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasicInfoState {
  fullName: string;
  designation: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  github: string;
  linkedin: string;
}

const initialState: BasicInfoState = {
  fullName: "",
  designation: "",
  location: "",
  email: "",
  phone: "",
  summary: "",
  github: "",
  linkedin: "",
};

const basicInfoSlice = createSlice({
  name: "basicInfo",
  initialState,
  reducers: {
    updateBasicInfo: (
      state,
      action: PayloadAction<{ field: keyof BasicInfoState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateBasicInfo } = basicInfoSlice.actions;
export default basicInfoSlice.reducer;
