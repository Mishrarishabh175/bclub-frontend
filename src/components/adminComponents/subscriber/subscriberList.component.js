import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import config from "../../../config/config"
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function List(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate=useNavigate()
    return(
        <tr>
            <td>{props.subscriber.name}</td>
            <td>{props.subscriber.email}</td>
            <td>{props.subscriber.date}</td>
            <td>
                <Button onClick={()=>navigate("/admin/subscriber/edit/"+props.subscriber._id)}>Edit</Button> | <Button variant="text" color="warning" onClick={handleClickOpen}>Delete</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogActions>
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm delete?"}
                    </DialogTitle>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="warning" onClick={()=>{props.handleDelete(props.subscriber._id)}} autoFocus>
                        delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </td>
            
        </tr>
    )
}

export default function SubscriberList(){
    
    const [subscribers, setSubscriber] = useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get(config.base_url+"subscribe/",{withCredentials:true})
            .then((res)=>{
                setSubscriber(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])
    function handleDelete(id){
        axios.delete(config.base_url+"subscribe/"+id,{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
            
        setSubscriber((prevState)=>{
            return prevState.filter((subscriber)=>subscriber._id!==id)
        })
    }
    const [page,setPage] = useState(1)
    const handlePagination = (event,p)=>{
        setPage(p)
    }
    const rows = 25
    const subscribersOnPage = page*rows<=subscribers.length ? subscribers.slice((page-1)*rows,rows):subscribers.slice((page-1)*rows,subscribers.length)
    function subscriberList(){
        return subscribersOnPage.map((subscriber)=>{
            return <List key={subscriber._id} subscriber={subscriber} handleDelete={handleDelete} />
        })
    }
    return (
        <div>
        <div className="d-flex justify-content-center m-1">
            <button type="submit" 
            className="btn btn-success btn-sm mr-1" 
            onClick={()=>{navigate("/admin/subscriber/add")}} >
                Add Subscriber
            </button>
            <button type="submit" className="btn btn-primary btn-sm" onClick={()=>{navigate("/admin/subscriber/sendmail")}}>Send Mail</button>
        </div>
        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { subscriberList() }
          </tbody>
        </table>
        <Pagination 
        count={Math.ceil(subscribers.length/rows)} 
        variant="outlined" 
        shape="rounded"
        sx={{
            pt:2,
            mx: 'auto'
            }}
        onChange={handlePagination}
        />
      </div>
    )
}