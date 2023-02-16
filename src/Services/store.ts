import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import {Reducer} from "./Redux/Reducer";

// import { cryptoApi } from "./Api";



const store = configureStore({
  reducer: {
    coins: Reducer
    // [cryptoApi.reducerPath]: cryptoApi.reducer
  }
})
export default store