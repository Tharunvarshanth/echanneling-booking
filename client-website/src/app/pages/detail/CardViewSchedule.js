import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import TimeTableDetails from "./TimeTableDetails";
const style={
    marginTop:"150px"
}
const cardheader={
    padding:"25px"
}
const d={
    display:'none'
}

function CardViewSchedule({props}){
    const list  = useSelector(state => state.timeschedule.scheduleList)
   console.log(list)


    function buttonclick(index){
        console.log(index)
      if(document.getElementById(index).style.display==='block'){
        document.getElementById(index).style.display='none'
          document.getElementById('btn'+index).innerText = 'View Schedule'

      }else{
        document.getElementById(index).style.display='block'
              document.getElementById('btn'+index).innerText = 'Close'

      }
    }

    return(
        <div style={style}>
            {  list.map((key)=>key.map((index)=>
                <div className="card">
                    <div style={cardheader} className="card-header d-flex justify-content-around">
                        <div className="d-flex justify-content-around">
                            {index.Name}
                        </div>

                        <div className="d-flex justify-content-around">
                            {index.HospitalName}
                        </div>
                        <div className="d-flex justify-content-around">
                            {index.Type}
                        </div>
                        <div className="d-flex justify-content-around">
                         <button id={`btn${index.Id}`} onClick={()=>buttonclick(index.Id)}>View Schedule</button>
                        </div>

                    </div>
                   <hr/>
                    <div id={index.Id}  style={d}>
                        <TimeTableDetails data={index} />
                    </div>
                </div>
            ))}



        </div>
    )
}

export default CardViewSchedule
