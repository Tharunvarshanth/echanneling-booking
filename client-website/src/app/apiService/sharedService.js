import React from "react";
import {isExpired,decodeToken} from "react-jwt";

export const userkey ="echanneling-usertoken"

export const setlocalstorage  = (profile)=>{
  console.log(profile)
  localStorage.setItem(userkey,JSON.stringify(profile))
}

export const getIsLoggedIn = ()=>{
    return localStorage.getItem(userkey)!=null
}
export const checktokenexpired = () =>{
    return isExpired(gettoken())
}

export const getlocalsotrage = ()=>{
  return JSON.parse(localStorage.getItem(userkey))
}

export const remove_user = ()=>{
   localStorage.removeItem(userkey)
}

export const getusernamefromtoken = ()=>{
   return  decodeToken(JSON.parse(localStorage.getItem(userkey)).token).subject
}

export const gettoken = ()=>{
    let t = JSON.parse(localStorage.getItem(userkey))
    if(t==null){
        t=null
        return null
    }
    return t.token
}
