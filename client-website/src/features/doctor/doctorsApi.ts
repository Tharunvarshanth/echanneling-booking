import {
    createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from "axios";
import {options} from "../../app/navigation/Auth/auth-token-interceptor";

const APIURL ="http://127.0.0.1:3005/api/doctor/"

export const fetchdoctorsIdandName = createAsyncThunk('doctor/getList',async()=>{
    const response = await  axios.get(APIURL+'doctorsnameandidlist',options)
    return response.data
})




