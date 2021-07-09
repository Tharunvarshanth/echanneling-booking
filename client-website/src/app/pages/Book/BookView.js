import {React, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import './styles/bookview.scss'


const initialValues = {
    username:'',
    mobile:'',
    displayname:'',
    doctor:'',
    specialization:'',
    hospital:'',
}



function BookView(){

    const { id,tdid } = useParams()

    const username = useSelector(state => state.user.Username)
    const displayname  = useSelector(state => state.user.Displayname)


    const formdata = useSelector(state => state.timeschedule.scheduleList)
    let content ={tt:{},doctorName:'',speciName:'',hospitalName:''} ;
   formdata.map(index=>{
       index.map(key=> {
           if (key.Id == id) {
               content.doctorName = key.Name
               content.hospitalName = key.HospitalName
               content.speciName = key.Type
               content.tt = (JSON.parse(key.TimeAndDate)[tdid])
           }
       })
   })

   function termsandconditions(){
       var checkBox = document.getElementById("termsandconditions");

       if (checkBox.checked === true){
           document.getElementById("proceed").disabled = false
       } else {
           document.getElementById("proceed").disabled = true
       }
   }

    useEffect(()=>{

    })

    return (
            <div className="formbody">
                <form>
                <div className="card">
                    <div className="card-header">
                        {content.doctorName} | {content.hospitalName} | {content.speciName}
                    </div>
                    <div className="card-body">
                        <h4>{username} <span>{displayname}</span></h4>
                        <blockquote className="blockquote mb-0">
                            <p>{content.tt.Time}  | {content.tt.day}</p>
                            <footer className="blockquote-footer"> <cite title="Source Title">
                               </cite></footer>
                        </blockquote>
                    </div>
                </div>
                  Terms&Conditions  <input type="checkbox" id="termsandconditions" onClick={termsandconditions} name="termsandconditions"/>
                    <button disabled="true" id="proceed" type="submit">Proceed </button>
                </form>
            </div>


    )
}
export default BookView
