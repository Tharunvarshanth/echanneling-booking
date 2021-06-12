import React, {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import './profileview.scss'

function ProfileView(){

    const dispatch = useDispatch();
    const [Username,setUsername] = useState(useSelector(state => state.user.Username))
    const [Mobile,setMobile] = useState(useSelector(state => state.user.Mobile))
    const [Role,setRole]  = useState(useSelector(state => state.user.Role))
    const [Displayname,setDisplayname] = useState(useSelector(state=>state.user.Displayname))
    console.log(Username,Role)
   return(
       <div className="container profileview">
         <label>Email</label><p>{Username}</p>
         <label>Mobile</label>  <p>{Mobile}</p>
         <label>Role</label>  <p>{Role}</p>
         <label>Display-Name</label>  <p>{Displayname}</p>
       </div>
   )
}

export default ProfileView
