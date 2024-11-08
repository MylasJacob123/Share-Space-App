import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  logged: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.logged = true; 
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.logged = false;
      localStorage.removeItem("user"); 
    },
    initializeUser(state) {
      const userData = localStorage.getItem("user");
      if (userData) {
        state.user = JSON.parse(userData);
        state.logged = true; 
      }
    },
  },
});

export const { setLoading, setUser, setError, logout, initializeUser } =  authSlice.actions;

export default authSlice.reducer;



