import React from "react";
import { Link, Route, useRouteMatch,useParams } from "react-router-dom";



function TimeTableDetails({data}){

    let scheduleData;


    if(data.TimeAndDate){
        //console.log( JSON.parse(data.TimeAndDate)[0])
        let key =0;
        JSON.parse(data.TimeAndDate).map(i=>console.log(i))
        scheduleData = (
            <div className="container">
                {JSON.parse(data.TimeAndDate).map((i) =>
                    <div>
                        <span>{i.day}  : {i.Time}</span>
                        &nbsp;&nbsp;
                        <Link to={`/book/${data.Id}/${key}`}>Book Now</Link>
                        <hr />

                    </div>

                )
                }
            </div>
        );
    } else {
        scheduleData = <>dsd</>;
    }

    return(
        <div>
            {scheduleData}
        </div>
    )
}

export default  TimeTableDetails
