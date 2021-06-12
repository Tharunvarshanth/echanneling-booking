import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    status:'idle',
    error:null,
    timescheduleId :'',
    doctorId:'',
    hospitalId:'',
    specializationId:'',
}

export const bookformsSlice:any = createSlice({
    name:'bookforms',
    initialState,
    reducers:{},
    extraReducers:{},
})


export default  bookformsSlice.reducer ;
