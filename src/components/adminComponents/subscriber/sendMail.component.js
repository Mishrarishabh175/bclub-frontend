import axios from "axios";
import React, {  useState} from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config";

export default function SendMail(){;
    const [data , setData] = useState({
        subject:"",
        body:""
    })
    const handleSubjectChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                subject:e.target.value
            }
        })
    }
    const handleBodyChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                body:e.target.value
            }
        })
    }
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(config.base_url+"subscribe/sendmail",{
            sub:data.subject,
            message:data.body
        },{withCredentials:true})
        .then((res)=>{
            navigate("/admin/subscriber/")
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    
    return (
        <div>
            <h3 className="text-center mt-5">Email</h3>
            <form onSubmit={handleSubmit} style={{maxWidth:"800px"}} 
            className="p-3 mt-1 mx-auto border border-secondary rounded" >
                
                <div className="form-group">
                    <label >Subject</label>
                    <input type="text"  onChange={handleSubjectChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label >Body</label>
                    <textarea onChange={handleBodyChange} className="form-control md-textarea" rows="9" />
                </div>
                
                <div>
                    <button type="submit" className="btn btn-primary" >Send</button>
                </div>
                
            </form>
        </div>
        
    )
}