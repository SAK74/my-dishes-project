import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "../dishesPages/dishesSlice";

export default configureStore({reducer: dishesReducer});