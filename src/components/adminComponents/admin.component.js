import React, { useEffect, useState } from "react"
import { Route,Routes, useLocation, useNavigate } from "react-router-dom"
import Event from "./event/event.component"
import President from "./president/president.component"
import Subscriber from "./subscriber/subscriber.component"
import YoutubeSession from "./youtube/youtubeSession.component"
import Login from "./login.component"
import AdminNavbar from "./adminNavbar.component"
import axios from "axios"
import config from "../../config/config"

export default function Admin(){
    const [islogin , setIsLogin] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const getLoginInfo = async()=>{
        try {
            const result = await axios.get(config.base_url+"admin/",
            {
                withCredentials:true
            })
            console.log(result)
            if(result.data===false&&location.pathname!=="/admin")
            {
                navigate("/admin")
            }
            if(result.data !== islogin) setIsLogin(result.data)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
    useEffect(()=>{
        getLoginInfo()
    })


    return(
        <div>
            {islogin && <AdminNavbar />}
            <Routes>
                {!islogin && <Route exact path="/" element={<Login />} />}
                {islogin && <Route exact path="/event/*" element={<Event />} />}
                {islogin && <Route exact path="/president/*" element={<President />} />}
                {islogin && <Route exact path="/subscriber/*" element={<Subscriber />} />}
                {islogin && <Route exact path="/youtubeSession/*" element={<YoutubeSession />} />}
                
            </Routes>
        </div>
        
    )
}