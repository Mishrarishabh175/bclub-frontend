import axios from "axios";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import '../../../App.css'


function ImagePreview(props){
    return(
        <div className="" style={{position:"relative"}}>
            <button type="button" className="close AClass" onClick={()=>props.handleImageClose(props.preview)}>
             <span>&times;</span>
            </button>
            <img className="form-img" src={props.preview} alt="not loaded"></img>
            {/* <button type="button" className="btn-close " aria-label="Close"></button> */}
            
        </div>
    )
}

export default function EventAdd(){
    const [data , setData] = useState({
        content:"",
        title:"",
        hashTags:"",
        date: new Date(),
        images:[],
        imagePreview:[],
        isChecked: false
    })
   
    const handleContentChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                content:e.target.value
            }
        })
    }
    const handleHashTagsChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                hashTags:e.target.value
            }
        })
    }
    const handleTitleChange = (e)=>{
        setData((prevState)=>{
            return {
                ...prevState,
                title:e.target.value
            }
        })
    }
    const handleDatePickerChange = (date)=>{
        console.log(data.date)
        setData((prevState)=>{
            return {
                ...prevState,
                date:date
            }
        })
    }
    const types = ["image/png","image/jpeg","image/jpg"]
    const handleImageChange = (e)=>{
        const imageFile = e.target.files[0]
        if(imageFile && types.includes(imageFile.type))
        {
            console.log(imageFile)
            const preview = URL.createObjectURL(imageFile)
            setData((prevState)=>{
                return {
                    ...prevState,
                    images:[...prevState.images,imageFile],
                    imagePreview:[...prevState.imagePreview,preview]
                }
            })
        }
        
    }
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = new FormData()
        form.append("title",data.title)
        form.append("content",data.content)
        form.append("hashTags",data.hashTags)
        form.append("date",data.date)
        data.images.forEach((image)=>form.append("images",image))
        axios.post(config.base_url+"event/add",
        form,{
            withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res)=>{
            navigate("/admin/Event/")
        })
        .catch((error)=>{
            console.log(error)
        })

    }
    const handleImageClose = (preview)=>{
        setData((prevState)=>{
            const newImages = []
            const newPreview = []
            for (let i=0;i<prevState.imagePreview.length;i++)
            {
                if(prevState.imagePreview[i]!==preview)
                {
                    newImages.push(prevState.images[i])
                    newPreview.push(prevState.imagePreview[i])
                }
            }
            URL.revokeObjectURL(preview)
            return {
                ...prevState,
                images: newImages,
                imagePreview: newPreview
            }

        })
    }
    const preview= data.imagePreview.map((preview,i)=> {
        return (
            <ImagePreview preview={preview} key={i} handleImageClose={handleImageClose}/>
        )
        
    })
    const handleSendMail =(e)=>{
        setData(prevState =>{return {...prevState,isChecked:e.target.checked}})
    }
    return (
        <form onSubmit={handleSubmit} style={{maxWidth:"500px"}} className="p-3 mx-auto mt-5 border border-secondary rounded">
            <div className="form-group">
                <label >title</label>
                <input type="text"  onChange={handleTitleChange} className="form-control" />
            </div>
            <div className="form-group">
                <label >content</label>
                <textarea  className="form-control md-textarea" rows={5} onChange={handleContentChange} />
                
            </div>
            <div className="form-group">
                <label >HashTags</label>
                <input type="text" className="form-control"  onChange={handleHashTagsChange} />
                
            </div>
            <div className="form-group">
                <label >Date</label>
                <DatePicker selected={data.date} onChange={handleDatePickerChange} />
                
            </div>
            <div className="form-group">
                
                <input id="send-mail" type="checkbox"  onClick={handleSendMail} />
                <label  htmlFor="send-mail">Send mail to subscribers</label>
            </div>
            {preview.length !==0 && preview}
            <div className="form-group">
                
                <label className="plus-label">
                    <span className="plus rounded-circle" >+</span>
                    {/* <h5 style={{marginLeft:"130px",color:"#efb6b2"}}>image</h5> */}
                    <input type="file" className="file-input form-control" onChange={handleImageChange} />
                </label> 
                
            </div>
            
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}