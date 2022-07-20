import axios from "axios";
import React, {  useState} from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config";

export default function SubscriberAdd(){;
    const [data , setData] = useState({
        email:"",
        name:""
    })
    const handleEmailChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                email:e.target.value
            }
        })
    }
    const handleNameChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                name:e.target.value
            }
        })
    }
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(config.base_url+"subscribe/",{
            email:data.email,
            name:data.name,
            date: new Date()
        },{withCredentials:true})
        .then((res)=>{
            navigate("/admin/subscriber/")
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    
    return (
        <form onSubmit={handleSubmit} style={{maxWidth:"330px"}} className="p-3 mx-auto mt-5 border border-secondary rounded">
            <div className="form-group">
                <label >Name
                    <input type="text"  onChange={handleNameChange} className="form-control" />
                </label>
            </div>
            <div className="form-group">
                <label >Email address
                    <input type="email" className="form-control"  onChange={handleEmailChange} aria-describedby="emailHelp" />
                </label>
            </div>
            
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}