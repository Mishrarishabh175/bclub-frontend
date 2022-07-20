import axios from "axios";
import React, { useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import config from "../../../config/config";

export default function SubscriberEdit(props){
    const {id} = useParams();
    const [data , setData] = useState({
        email:"",
        name:""
    })
    useEffect(()=>{
        axios.get(config.base_url+"subscribe/"+id,{withCredentials:true})
            .then((res)=>{
                setData({
                    email:res.data.email,
                    name:res.data.name
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    },[id])
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
        axios.put(config.base_url+"subscribe/"+id,{
            email:data.email,
            name:data.name
        },{withCredentials:true})
        .then((res)=>{
            console.log(res);
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
                    <input type="text" value={data.name} onChange={handleNameChange} className="form-control" />
                </label>
            </div>
            <div className="form-group">
                <label >Email address
                    <input type="email" value={data.email} className="form-control"  onChange={handleEmailChange} aria-describedby="emailHelp" />
                </label>
            </div>
            
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        
    )
}