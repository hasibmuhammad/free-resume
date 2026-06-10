import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { hydrateResume } from "@/redux/actions/hydrateResume";
import { DEFAULT_TEMPLATE_ID } from "@/lib/templates/registry";
import {
  ResumeThemeCustomization,
  ResumeTemplateId,
} from "@/lib/templates/types";

interface TemplateState {
  templateId: ResumeTemplateId;
  themeCustomization: ResumeThemeCustomization;
}

const initialState: TemplateState = {
  templateId: DEFAULT_TEMPLATE_ID,
  themeCustomization: {},
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplateId: (state, action: PayloadAction<ResumeTemplateId>) => {
      state.templateId = action.payload;
    },
    setThemeCustomization: (
      state,
      action: PayloadAction<ResumeThemeCustomization>
    ) => {
      state.themeCustomization = action.payload;
    },
    patchThemeCustomization: (
      state,
      action: PayloadAction<Partial<ResumeThemeCustomization>>
    ) => {
      state.themeCustomization = {
        ...state.themeCustomization,
        ...action.payload,
      };
    },
    resetThemeCustomization: (state) => {
      state.themeCustomization = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateResume, (_state, action) => ({
      templateId: action.payload.templateId ?? DEFAULT_TEMPLATE_ID,
      themeCustomization: action.payload.themeCustomization ?? {},
    }));
  },
});

export const {
  setTemplateId,
  setThemeCustomization,
  patchThemeCustomization,
  resetThemeCustomization,
} = templateSlice.actions;

export default templateSlice.reducer;
