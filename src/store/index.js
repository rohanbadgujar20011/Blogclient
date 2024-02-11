import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: localStorage.getItem("isLoggedIn") },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("user-data");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("auth-token");
      state.isLoggedIn = false
    
      
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkmode: false,
  },
  reducers: {
    setDarkmode: (state, action) => {
      state.isDarkmode = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const setDarkmode = themeSlice.actions.setDarkmode;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
