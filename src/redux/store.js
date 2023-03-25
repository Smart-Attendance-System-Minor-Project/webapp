import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducers/authSlice";
import recordReducer from './recordReducer/recordSlice';
import traverseReducer from './recordReducer/studentDateSlice'
import absentStudentReducer from './recordReducer/absentStudents'
import setForViewReducer from './recordReducer/ViewRecordSlice'
// export const store = configureStore({


export const store = configureStore(
    {
        reducer:{
            auth:authReducer,
            record:recordReducer,
            traversing:traverseReducer,
            absence:absentStudentReducer,
            viewRecord:setForViewReducer
       
        }
    }
    
  );