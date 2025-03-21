import { configureStore } from "@reduxjs/toolkit";
import basicInfoReducer from "./features/basicInfoSlice";
import educationReducer from "./features/educationSlice";
import experienceReducer from "./features/experienceSlice";
import projectReducer from "./features/projectSlice";
import sectionsReducer from "./features/sectionsSlice";
import skillReducer from "./features/skillSlice";

export const store = configureStore({
  reducer: {
    sections: sectionsReducer,
    basicInfo: basicInfoReducer,
    experience: experienceReducer,
    education: educationReducer,
    project: projectReducer,
    skill: skillReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializability check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
