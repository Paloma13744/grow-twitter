import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
  name: null,
  email: null,
  imageUrl: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        username: string;
        name: string;
        email: string;
        imageUrl: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.imageUrl = action.payload.imageUrl;
    },
    clearAuth: (state) => {
      state.token = null;
      state.username = null;
      state.name = null;
      state.email = null;
      state.imageUrl = null;
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;