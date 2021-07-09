import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loginbyUsername} from "../../../features/authUser/userApi";
import {getusernamefromtoken} from "../../apiService/sharedService";
import {useParams} from 'react-router-dom'
import BookView from "./BookView";



function BookContainer(){
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
                    <BookView/>
                  </React.Fragment>
    }else{
       content =  <div>error: {error}</div>
    }

    return(
        <div className="container">
            {content}
        </div>
    )
}

export default  BookContainer
