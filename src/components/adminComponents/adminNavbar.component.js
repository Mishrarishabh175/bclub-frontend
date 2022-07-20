import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import config from '../../config/config'

export default function AdminNavbar(){
  const [open , setOpen] = React.useState(true)

  const toggleOpen = ()=>{
    setOpen(prevState => !prevState)
  }
  const show = (open) ? "show" : "" ;

  const navigate = useNavigate();
  const handleLogout = ()=>{
    axios.get(config.base_url+"admin/logout",{withCredentials:true})
          .then((res)=>{
            navigate("/admin/")
          })
  }
    return (
        <nav className="navbar navbar-expand-lg navbar-light  bg-light " >
          <button className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" 
          aria-expanded="false" 
          onClick={toggleOpen}
          aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse " +show} >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/admin/event">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/president">Presidents</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/subscriber">Subscribers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/youtubeSession">YoutubeSessions</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">             
              <li style={{alignContent:"center"}}>
                <button type="submit" className="btn btn-danger" onClick={handleLogout} >Logout</button>
              </li>
            </ul>
          </div>
        </nav>
      
    )
}