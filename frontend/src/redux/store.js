import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./tareaSlice";

const store = configureStore({
  reducer: reducer,
});

export default store;