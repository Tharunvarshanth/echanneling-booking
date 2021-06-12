import React, {useEffect} from "react";
import DashBoardView from "./DashBoardView";
import {useDispatch, useSelector} from "react-redux";
import {fetchhospitalsNameandId} from "../../../features/hospital/hospitalsApi";
import {fetchdoctorsIdandName} from "../../../features/doctor/doctorsApi"
import {fetchspecializationSpecializationandId} from "../../../features/specialiation/specializationApi";
import './styles/dashboardstyles.scss'




function DashBoardContainer(){
   const dispatch = useDispatch()
   const status_hos = useSelector(state => state.hospitals.status)
    const error_hos = useSelector(state =>state.hospitals.error)

    const status_doc = useSelector(state =>state.doctors.status)
    const error_doc  = useSelector(state => state.doctors.error)

   const status_spe  = useSelector(state => state.specialization.status)
   const error_spe = useSelector(state => state.specialization.error)

  useEffect(()=>{
         if(status_hos==='idle'){
             dispatch(fetchhospitalsNameandId())
         }
         if(status_doc==='idle'){
             dispatch(fetchdoctorsIdandName())
         }
         if(status_spe==='idle'){
             console.log("ewfwe")
             dispatch(fetchspecializationSpecializationandId())
         }

    },[dispatch,status_hos,status_doc,status_spe])

    let content;

    if(status_hos==='loading' || status_doc==='loading' ||status_spe==='loading'){
        content = <div className="loading">Loading ...</div>
    }else if(status_hos === 'succeeded' && status_doc==='succeeded' && status_spe==='succeeded'){
        content =<DashBoardView/>
    }else{
      content =  <div className="containereerror">error:Refresh the page</div>
    }

    return(
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}

export default  DashBoardContainer;
