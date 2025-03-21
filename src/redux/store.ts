import { configureStore } from "@reduxjs/toolkit";
import sectionsReducer from "./features/sectionsSlice";
import educationReducer from "./features/educationSlice";
import experienceReducer from "./features/experienceSlice";
import projectReducer from "./features/projectSlice";
export const store = configureStore({
  reducer: {
    sections: sectionsReducer,
    experience: experienceReducer,
    education: educationReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
