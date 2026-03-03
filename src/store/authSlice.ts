import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
}

const STORAGE_KEY = "growtweet_auth";

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null, username: null, name: null, email: null, imageUrl: null };
    const parsed = JSON.parse(raw) as AuthState;
    return {
      token: parsed.token ?? null,
      username: parsed.username ?? null,
      name: parsed.name ?? null,
      email: parsed.email ?? null,
      imageUrl: parsed.imageUrl ?? null,
    };
  } catch {
    return { token: null, username: null, name: null, email: null, imageUrl: null };
  }
}

function saveAuth(state: AuthState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const initialState: AuthState = loadAuth();

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

      saveAuth(state);
    },
    clearAuth: (state) => {
      state.token = null;
      state.username = null;
      state.name = null;
      state.email = null;
      state.imageUrl = null;

      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;