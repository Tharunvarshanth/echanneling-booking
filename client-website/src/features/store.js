import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import userReducer from './authUser/userSlice';
import hospitalsReducer from './hospital/hospitalsSlice';
import doctorsReducer from './doctor/doctorsSlice';
import specializationReducer from './specialiation/specializationSlice';
import timescheduleReducer from "./timeschedule/timescheduleSlice";
import bookformsReducer from "./bookform/bookformsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer,
    hospitals:hospitalsReducer,
    doctors:doctorsReducer,
    specialization : specializationReducer,
    timeschedule : timescheduleReducer,
    bookform:bookformsReducer
  },
});
