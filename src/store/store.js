import { configureStore } from "@reduxjs/toolkit";
import rootBeerReducer from "../store/slices/drinkSlice";

const store = configureStore({
  reducer: {
    rootBeers: rootBeerReducer,
  },
});

export default store;
