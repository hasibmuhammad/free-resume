import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { hydrateResume } from "@/redux/actions/hydrateResume";
import { BasicInfo } from "@/types/resume";

const initialState: BasicInfo = {
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
      action: PayloadAction<{ field: keyof BasicInfo; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateResume, (_state, action) => action.payload.basicInfo);
  },
});

export const { updateBasicInfo } = basicInfoSlice.actions;
export default basicInfoSlice.reducer;
