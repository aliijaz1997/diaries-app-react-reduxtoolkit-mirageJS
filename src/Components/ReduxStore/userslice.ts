import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { user } from '../Interfaces/user.interface';

const Userslice = createSlice({
  name: 'user',
  initialState: null as user | null,
  reducers: {
    setuser(state, { payload }: PayloadAction<user | null>) {
      return state = (payload != null) ? payload : null;
    },
  },
});

export const { setuser } = Userslice.actions;
export default Userslice.reducer;