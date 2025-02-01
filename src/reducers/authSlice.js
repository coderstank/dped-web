import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")),
  isAuthenticated: sessionStorage.getItem("token"),
  isLoading: false,
};

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      sessionStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      sessionStorage.clear();
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setLoading, setUser } = counterSlice.actions;
export default counterSlice.reducer;
