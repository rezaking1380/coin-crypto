import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import {Reducer} from "./Redux/Reducer";




const store = configureStore({
  reducer: {
    coins: Reducer
  }
})
export default store