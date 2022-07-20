import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css'
import axios from "axios";
import config from "../../config/config"

export default function Login(){
    const [data, setData] = useState({email:"",password:"",flag:false})
    const handleEmailChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                email:e.target.value
            }
        })
    }
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(config.base_url+"admin/login",{
            email:data.email,
            password:data.password
        },{withCredentials:true})
        .then((res)=>{
            console.log(res);
            if(res.data === true)
            {
                navigate("/admin/event")
            }
            else {
                setData({
                    email:"",
                    password:"",
                    flag:true
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handlePasswordChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                password:e.target.value
            }
        })
    }
    return (
            <form className="login corner-rounded" onSubmit={handleSubmit} >
                <h2>Admin Login</h2>
                {data.flag && <p className="text-danger">Incorrect Email or Password</p>}
                <div className="form-group" >
                    <label>Email 
                        <input type="email" value={data.email} onChange={handleEmailChange} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    </label>
                </div>
                <br/>
                <div className="form-group">
                    <label >Password
                        <input type="password" value={data.password} onChange={handlePasswordChange} className="form-control" placeholder="Password" />
                    </label>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
        
    )
}