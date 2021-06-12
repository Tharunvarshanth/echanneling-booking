import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {
    getListByDoctorId,
    getListByHospitalId,
    getListBySpecializationId
} from "../../../features/timeschedule/timescheduleApi";
import DashBoardView from "../DashBoard/DashBoardView";

import CardViewSchedule from "./CardViewSchedule";


function DetailViewContainer(){
    const dispatch = useDispatch()
    const [hosId,setHosId] = useState(useSelector(state => state.timeschedule.hospitalId))
    const [docId,setDocId] = useState(useSelector(state => state.timeschedule.doctorId))
    const [speId,setSpeId] = useState(useSelector(state => state.timeschedule.specializationId))

   const status = useSelector(state => state.timeschedule.status)
console.log(hosId)
    useEffect(()=>{
        if(status === 'idle'){
            if(hosId!=="" && docId===""&&speId===""){
                dispatch(getListByHospitalId(hosId))
            }
            if(docId!=="" && speId==="" && hosId===""){
                dispatch(getListByDoctorId(docId))
            }
            if(speId!==""&&docId===""&&hosId===""){
                dispatch(getListBySpecializationId(speId))
            }
        }
    },[status,dispatch])

    let content ;
    if(status==='loading' ){
        content = <div className="loading">Loading ...</div>
    }else if(status === 'succeeded' ){
        content =<CardViewSchedule/>
    }else{
        content =  <div className="containereerror">error: refresh the page</div>
    }

    return(
        <>
            {content}
        </>
    )
}

export default DetailViewContainer
