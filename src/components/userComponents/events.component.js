import React, { useState,useEffect } from "react";
import config from "../../config/config";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import EventGrid from "./eventGrid";
import Pagination from '@mui/material/Pagination';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";



export default function Events(){
    const [events,setEvents]= useState([])
    useEffect(()=>{
        axios.get(config.base_url+"event/")
            .then((res)=>{
                setEvents(res.data) 
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])
    const [page,setPage] = useState(1)
    const handlePagination = (event,p)=>{
        setPage(p)
    }
    const eventsOnPage = page*6<=events.length ? events.slice((page-1)*6,6):events.slice((page-1)*6,events.length)
    
    return(
        <div >
            <Box
                
                sx={{
                py: 10,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm" sx={{ml:8}}>
                <Typography variant="h1" sx={{color:'#067196',display: { xs: 'none', md: 'flex' },fontWeight:'400'}}>
                    EVENTS
                </Typography>
                </Container>
                <Container maxWidth="sm" sx={{ml:7}}>
                <Typography variant="h3" sx={{color:'#067196',display: { xs: 'flex', md: 'none' },fontWeight:'400'}}>
                    EVENTS
                </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {eventsOnPage.map((event) => {
                        return <EventGrid event={event} key={event._id} />
                    })}
                </Grid>
                <Pagination 
                count={Math.ceil(events.length/6)} 
                variant="outlined" 
                shape="rounded"
                sx={{
                    pt:2,
                    mx: 'auto'
                }}
                onChange={handlePagination}
                />
            </Container>
        </div>
    )
}


// function Event(props){
// const [ind , setInd]= useState(0)
// const images = props.event.images.map((image)=>{return {url:config.base_url+"event/image/"+image}})
// console.log(ind)

// const handleLeftButton = ()=>{
//     setInd(ind===0?props.event.images.length-1:ind-1)
// }
// const handleRightButton = ()=>{
//     setInd((ind+1)%props.event.images.length)
// }
// const handleBulletClick = (index)=>{
//     setInd(index)
// }
// const bulletButton = props.event.images.map((image,i)=> <Bullet key={i} index={i} ind={ind} handleBulletClick={handleBulletClick} />)
// return (
//         <div className="event-div row">
//             <div className="col-md-5 ">
//                 <div className="first-div">
//                         <img className="fourth-div" src={props.event.images.length === 0 ? "" : config.base_url+"event/image/"+props.event.images[ind]} alt="No photos available"/>
//                         <button className="first-button" type="button" onClick={handleLeftButton}>
//                         <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3e %3cdefs%3e %3cfilter id='0ls8o9a99a' width='168.9%25' height='218.6%25' x='-34.5%25' y='-59.3%25' filterUnits='objectBoundingBox'%3e %3cfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3e %3cfeGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='2'/%3e %3cfeColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0'/%3e %3c/filter%3e %3cpath id='rs87bry78b' d='M19 7L20.413 8.414 11.707 17.12 2.999 8.414 4.413 7 11.707 14.291z'/%3e %3c/defs%3e %3cg fill='none' fill-rule='evenodd'%3e %3cg%3e %3cg%3e %3cg transform='translate(-24 -27) translate(24 27) rotate(90 11.707 12.06)'%3e %3cuse fill='black' filter='url(%230ls8o9a99a)' xlink:href='%23rs87bry78b'/%3e %3cuse fill='white' xlink:href='%23rs87bry78b'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e" alt="slide to left" style={{width: "100%"}} />
//                         </button>
//                         <button type="button" className="second-button" onClick={handleRightButton}>
//                         <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3e %3cdefs%3e %3cfilter id='0ls8o9a99a' width='168.9%25' height='218.6%25' x='-34.5%25' y='-59.3%25' filterUnits='objectBoundingBox'%3e %3cfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3e %3cfeGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='2'/%3e %3cfeColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0'/%3e %3c/filter%3e %3cpath id='rs87bry78b' d='M19 7L20.413 8.414 11.707 17.12 2.999 8.414 4.413 7 11.707 14.291z'/%3e %3c/defs%3e %3cg fill='none' fill-rule='evenodd'%3e %3cg%3e %3cg%3e %3cg transform='translate(-24 -27) translate(24 27) rotate(90 11.707 12.06)'%3e %3cuse fill='black' filter='url(%230ls8o9a99a)' xlink:href='%23rs87bry78b'/%3e %3cuse fill='white' xlink:href='%23rs87bry78b'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e" alt="slide to right" style={{width: "100%", transform: "rotate(180deg)"}} />
//                         </button>
//                         <div className="fifth-div" style={{margin: "0px 0px 0px -"+props.event.images.length*13/2+"px"}}>
//                             {bulletButton}
//                         </div>
//                     </div>
//                 {/* </div> */}
//             </div>
//             <div className="col-md-7" style={{border:"1px solid grey"}}>
//                 <div className="event-content">
//                     <p>{props.event.content}</p>
//                 </div>
//             </div>
            
//         </div>
// )
// }
