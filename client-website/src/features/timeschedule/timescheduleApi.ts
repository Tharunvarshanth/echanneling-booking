import {
    createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from "axios";
import {options} from "../../app/navigation/Auth/auth-token-interceptor";

const APIURL ="http://127.0.0.1:3005/api/ts/"


export const getListByDoctorId = createAsyncThunk('ts/getbyDoctorId',async(did)=>{
    const response = await  axios.get(APIURL+`getbyDoctorId?Did=${did}`,options)
    return response.data
})

export const getListByHospitalId = createAsyncThunk('ts/getbyHospitalId',async(hid)=>{
    const response  = await axios.get(APIURL+`getbyHospitalId?Hid=${hid}`,options)
    return response.data
})

export const getListBySpecializationId = createAsyncThunk('ts/getbySpecializationId',async(sid)=>{
    const response = await axios.get(APIURL+`getbySpecializationId?Sid=${sid}`,options)
    return response.data
})
