import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

const getAuthState = (state) => state?.auth ?? state ?? initialState;

export const selectCurrentToken = (state) => getAuthState(state).token;
export const selectCurrentUser = (state) => getAuthState(state).user;

// Backward-compatible aliases for existing imports. Use these with useSelector.
export const useCurrentToken = selectCurrentToken;
export const useCurrentUser = selectCurrentUser;
