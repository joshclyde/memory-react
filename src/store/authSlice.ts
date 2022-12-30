import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./";

interface AuthState {
  isAuthenticated: boolean;
  loading: null | "PENDING" | "SUCCESS" | "ERROR";
  uid: null | string;
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuthenticated: false,
  uid: null,
  loading: null,
};

export const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    pending: (state) => {
      state.isAuthenticated = false;
      state.loading = `PENDING`;
      state.uid = null;
    },
    success: (state, action: PayloadAction<{ uid: string | null }>) => {
      state.loading = `SUCCESS`;
      state.uid = action.payload.uid;
      state.isAuthenticated = Boolean(action.payload.uid);
    },
    failure: (state) => {
      state.isAuthenticated = false;
      state.loading = `ERROR`;
      state.uid = null;
    },
  },
});

export const { pending, success, failure } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const authSliceReducer = authSlice.reducer;
