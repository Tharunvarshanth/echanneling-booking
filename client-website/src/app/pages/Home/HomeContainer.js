import React, {useEffect} from 'react'

import HomeHeader from "./HomeHeader";
import {useDispatch, useSelector} from "react-redux";
import {getlocalsotrage} from "../../apiService/sharedService";
import {updatestates} from "../../../features/authUser/userSlice";

export  function HomeContainer(){
    const dispatch = useDispatch()
    const status = useSelector(state => state.user.status)

    useEffect(()=>{
        const uservalue = getlocalsotrage();
        if(uservalue!=null) {
            dispatch(updatestates(uservalue))
        }

    },[dispatch])
    return (
        <React.Fragment>
           <HomeHeader/>
        </React.Fragment>
    )
}
