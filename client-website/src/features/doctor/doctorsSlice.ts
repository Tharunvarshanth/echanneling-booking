import {createSlice} from "@reduxjs/toolkit";
import {fetchdoctorsIdandName} from "./doctorsApi";

const initialState = {
    doctorsArray : [],
    status :'idle',
    error:null
}

export const doctorsSlice:any  = createSlice({
    name:'doctors',
    initialState:initialState,
    reducers:{},
    extraReducers:{
         [fetchdoctorsIdandName.rejected.toString()]:(state,action)=>{
              state.status = 'failed'
              state.error = action.error.message
         },
        [fetchdoctorsIdandName.pending.toString()]:(state,action)=>{
             state.status = 'loading'
        },
        [fetchdoctorsIdandName.fulfilled.toString()]:(state,action)=>{
             state.status = 'succeeded'
            // @ts-ignore
             state.doctorsArray.push(action.payload)
        }
    }
})


export default  doctorsSlice.reducer;
