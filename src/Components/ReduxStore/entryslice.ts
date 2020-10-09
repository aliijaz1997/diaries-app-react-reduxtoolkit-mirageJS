import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { entry } from '../Interfaces/entry.interface';

const entries = createSlice({
  name: 'entries',
  initialState: [] as entry[],
  reducers: {
    setEntries(state, { payload }: PayloadAction<entry[] | null>) {
      return (state = payload != null ? payload : []);
    },
    updateEntry(state, { payload }: PayloadAction<entry>) {
      const { id } = payload;
      const index = state.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.splice(index, 1, payload);
      }
    },
  },
});

export const { setEntries, updateEntry } = entries.actions;

export default entries.reducer;
