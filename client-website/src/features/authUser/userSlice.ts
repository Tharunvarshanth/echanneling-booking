import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from "axios";
import {loginbyUsername, loginUser, registerUser} from "./userApi";
import {setlocalstorage} from "../../app/apiService/sharedService";




const initialState ={
    status:'idle',
    error:null,
    token:'',
    Id:'',
    Role:'',
    auth:'',
    Displayname:'',
    Username:'',
    Mobile:''
}

export const userSlice:any  = createSlice({
    name:'user',
    initialState,
    reducers: {
        updatestates:(state,action)=>{
            state.Role = action.payload.role
            state.token = action.payload.token
            state.auth= action.payload.auth
        },
        logout :(state)=>{


        }
    },
    extraReducers: {
        [registerUser.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [registerUser.fulfilled.toString()]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.Role = action.payload.role
            state.token = action.payload.token
            state.auth= action.payload.auth
            setlocalstorage(action.payload)
           // localStorage.setItem("ehanneling",{token:action.payload.token,role:action.payload.role,auth:action.payload.auth})
        },
        [registerUser.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
            console.log(action.error.message)
        },
        [loginUser.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [loginUser.fulfilled.toString()]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array

            state.Role = action.payload.role
            state.token = action.payload.token
            state.auth= action.payload.auth
            setlocalstorage(action.payload)
        },
        [loginUser.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
            console.log(action.error.message)
        },
        [loginbyUsername.pending.toString()]:(state,action)=>{
            state.status = 'loading'
        },
        [loginbyUsername.fulfilled.toString()]:(state,action)=>{

            state.status = 'succeeded'
            state.Id = action.payload.Id
            state.Role = action.payload.Role
            state.token = action.payload.token
            state.auth= action.payload.auth
            state.Username = action.payload.Username
            state.Displayname = action.payload.Displayname
            state.Mobile = action.payload.Mobile
        },
        [loginbyUsername.rejected.toString()]:(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
            console.log(action.error.message)
        }
    }
})



export const { updatestates } = userSlice.actions;

export default userSlice.reducer



