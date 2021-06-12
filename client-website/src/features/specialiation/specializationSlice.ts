import {createSlice} from "@reduxjs/toolkit";
import {fetchspecializationSpecializationandId} from "./specializationApi";



const initialState = {
    status:'idle',
    specializationArray : [],
    error:null
}

export const specializationSlice = createSlice({
    name:'specialization',
    initialState:initialState,
    reducers:{},
    extraReducers:{
       [fetchspecializationSpecializationandId.rejected.toString()]:(state,action)=>{
           console.log(action.error.message)
           state.error = action.error.message;
           state.status = 'failed'
       },
        [fetchspecializationSpecializationandId.pending.toString()]:(state,action)=>{
           state.status = 'loading'
        },
        [fetchspecializationSpecializationandId.fulfilled.toString()]:(state,action)=>{
           state.status = 'succeeded'
            // @ts-ignore
            state.specializationArray.push(action.payload)
        }
    }
})

export default  specializationSlice.reducer
