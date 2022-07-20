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

    return(
        <tr>
            <td>{props.Event.title}</td>
            <td>{props.Event.content}</td>
            <td>{props.Event.date}</td>
            <td>
                <Button variant="contained" color="warning"  onClick={handleClickOpen}>Delete</Button>
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
                    <Button color="warning" onClick={()=>props.handleDelete(props.Event._id)} autoFocus>
                        delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </td>
            
        </tr>
    )
}

export default function EventList(){
    
    const [Events, setEvents] = useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get(config.base_url+"event/",{withCredentials:true})
            .then((res)=>{
                setEvents(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])
    function handleDelete(id){
        axios.delete(config.base_url+"event/"+id,{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
            
        setEvents((prevState)=>{
            return prevState.filter((Event)=>Event._id!==id)
        })
    }
    
    const [page,setPage] = useState(1)
    const handlePagination = (event,p)=>{
        setPage(p)
    }
    const eventsOnPage = page*6<=Events.length ? Events.slice((page-1)*6,6):Events.slice((page-1)*6,Events.length)
    
    function EventList(){
        return eventsOnPage.map((event)=>{
            return <List key={event._id} Event={event} handleDelete={handleDelete} />
        })
    }
    
    return (
        <div>
        <div className="d-flex justify-content-center m-1">
            <button type="submit" 
            className="btn btn-success btn-sm mr-1" 
            onClick={()=>{navigate("/admin/event/add")}} >
                Add Event
            </button>
        </div>
        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { EventList() }
          </tbody>
        </table>
        <Pagination 
        count={Math.ceil(Events.length/6)} 
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