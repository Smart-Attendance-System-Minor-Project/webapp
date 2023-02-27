import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducers/authSlice";
import recordReducer from './recordReducer/recordSlice';
// export const store = configureStore({


export const store = configureStore(
    {
        reducer:{
            auth:authReducer,
            record:recordReducer
       
        }
    }
    
  );