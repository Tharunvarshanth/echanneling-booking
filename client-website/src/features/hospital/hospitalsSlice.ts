import {createSlice} from "@reduxjs/toolkit";
import {fetchhospitalsNameandId} from './hospitalsApi'

const initialState ={
    hospitalsArray:[],
    status:'idle',
    error:null
}

export const hospitalsSlice:any  = createSlice({
    name:'hospitals',
    initialState:initialState,
    reducers:{},
    extraReducers:{
        [fetchhospitalsNameandId.rejected.toString()]:(state,action)=>{
                state.status = 'failed';
                state.error = action.error.message
        },
        [fetchhospitalsNameandId.pending.toString()]:(state,action)=>{
                state.status = 'loading'

        },
        [fetchhospitalsNameandId.fulfilled.toString()]:(state,action)=> {
            state.status = 'succeeded'
            // @ts-ignore
            state.hospitalsArray.push(action.payload)

        }
    }
})


export default hospitalsSlice.reducer
