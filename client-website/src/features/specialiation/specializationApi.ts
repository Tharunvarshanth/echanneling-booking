import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {options} from "../../app/navigation/Auth/auth-token-interceptor";

const APIURL ="http://127.0.0.1:3005/api/specialization/"

export const fetchspecializationSpecializationandId = createAsyncThunk('specialization/list',async()=>{
    console.log("bjnmn")
    const response  = await axios.get(APIURL+'getspecficationlist',options)
    return response.data
})
