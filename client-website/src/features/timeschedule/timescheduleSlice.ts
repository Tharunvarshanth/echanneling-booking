import {createSlice} from "@reduxjs/toolkit";
import {getListByDoctorId, getListByHospitalId, getListBySpecializationId} from "./timescheduleApi";


const initialState = {
    status:'idle',
    error:null,
    doctorId:'',
    hospitalId:'',
    specializationId:'',
    scheduleList:[]
}

export const timescheduleSlice = createSlice({
    name:'schedule',
    initialState,
    reducers:{
        updateDoctorId:(state,action)=>{
            state.doctorId = action.payload
        },
        updateHospitalId:(state,action)=>{
            state.hospitalId = action.payload
        },
        updateSpecializationId:(state,action)=>{
            state.specializationId = action.payload
        }
    },
    extraReducers:{
        [getListByDoctorId.rejected.toString()]:(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        },
        [getListByDoctorId.pending.toString()]:(state,action)=>{
            state.status = 'loading'
        },
        [getListByDoctorId.fulfilled.toString()]:(state,action)=>{
            state.status = 'succeeded'
            // @ts-ignore
            state.scheduleList.push(action.payload)
        },
        [getListByHospitalId.rejected.toString()]:(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        },
        [getListByHospitalId.pending.toString()]:(state,action)=>{
            state.status = 'loading'
        },
        [getListByHospitalId.fulfilled.toString()]:(state,action)=>{
            state.status = 'succeeded'
            // @ts-ignore
            state.scheduleList.push(action.payload)
        },
        [getListBySpecializationId.rejected.toString()]:(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        },
        [getListBySpecializationId.pending.toString()]:(state,action)=>{
            state.status = 'loading'
        },
        [getListBySpecializationId.fulfilled.toString()]:(state,action)=>{
            state.status = 'succeeded'
            // @ts-ignore
            state.scheduleList.push(action.payload)
        }
    }

})


export const { updateDoctorId, updateHospitalId, updateSpecializationId } = timescheduleSlice.actions;

export default  timescheduleSlice.reducer
