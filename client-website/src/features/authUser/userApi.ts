import {
    createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from "axios";
import {options} from "../../app/navigation/Auth/auth-token-interceptor";

const APIURL ="http://127.0.0.1:3005/api/user/"


export const registerUser = createAsyncThunk('user/register',async(initialUser)=>{
    const response  = await axios.post(APIURL+'register',initialUser)
    return response.data
})

export const loginUser = createAsyncThunk('user/login',async(initialUser)=>{
    console.log("loginuser")
    console.log(initialUser)
    const response = await axios.post(APIURL+'login',initialUser)
    return response.data
})

export const loginbyUsername = createAsyncThunk('user/loginbyusername',async(username:any)=>{
    const response  =  await axios.get(APIURL+`userinfo?username=${username}`,options)
    return response.data
})
