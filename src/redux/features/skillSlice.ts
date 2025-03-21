import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SkillState {
  skills: string[];
  removedSkills: string[];
}

const initialState: SkillState = {
  skills: [],
  removedSkills: [],
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<string>) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      const skillToRemove = state.skills[action.payload];
      state.skills.splice(action.payload, 1);
      state.removedSkills.push(skillToRemove);
    },
    undoRemoveSkill: (state) => {
      if (state.removedSkills.length > 0) {
        const skillToUndo = state.removedSkills[0];
        state.skills.push(skillToUndo);
        state.removedSkills.splice(0, 1);
      }
    },
  },
});

export const { addSkill, removeSkill, undoRemoveSkill } = skillSlice.actions;
export default skillSlice.reducer;
