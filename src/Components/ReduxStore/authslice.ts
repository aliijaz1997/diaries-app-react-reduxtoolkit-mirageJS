import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tosavetoken(state, { payload }: PayloadAction<string>) {
      if (payload) {
        state.token = payload;
      }
    },
    clearToken(state) {
      state.token = null;
    },
    toallowauthentication(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },
  },
});

export const { tosavetoken, clearToken, toallowauthentication } = auth.actions;
export default auth.reducer;