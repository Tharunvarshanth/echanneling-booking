import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProfileView from "./ProfileView";
import {getusernamefromtoken} from "../../apiService/sharedService";
import {loginbyUsername} from "../../../features/authUser/userApi";





function ProfileContainer(){
    const dispatch = useDispatch();
    const status = useSelector(state => state.user.status)
    const error = useSelector(state => state.user.error)

    useEffect(()=>{
        if(status==='idle'){
            dispatch(loginbyUsername(getusernamefromtoken()))
        }
    },[dispatch,status])

    let content;
    if(status==='loading'){
        content = <div className="loading">Loading ...</div>
    }else if(status === 'succeeded'){
     content = <React.Fragment>
                   <ProfileView/>
                 </React.Fragment>
    }else{
        <div>error: {error}</div>
    }

    return(
        <div className="container">
            { content}
        </div>
    )
}

export default  ProfileContainer
