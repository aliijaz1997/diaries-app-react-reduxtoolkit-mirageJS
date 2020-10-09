import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { diary } from '../Interfaces/diary.interface';

const diaries = createSlice({
  name: 'diaries',
  initialState: [] as diary[],
  reducers: {
    addDiary(state, { payload }: PayloadAction<diary[]>) {
      const diariesToSave = payload.filter((diary) => {
        return state.findIndex((item) => item.id === diary.id) === -1;
      });
      state.push(...diariesToSave);
    },
    updateDiary(state, { payload }: PayloadAction<diary>) {
      const { id } = payload;
      const diaryIndex = state.findIndex((diary) => diary.id === id);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, payload);
      }
    },
  },
});

export const { addDiary, updateDiary } = diaries.actions;
export default diaries.reducer;