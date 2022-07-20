import React, { useState,useEffect } from "react";
import config from "../../config/config";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Bullet(props){
    return  <button 
            type="button" 
            data-id={"bullet-"+props.index} 
            className="bullet-button" 
            style={{background: props.ind === props.index ? "rgb(255, 255, 255)" : "none"}}
            onClick={()=>props.handleBulletClick(props.index)}>
            </button>
}


export default function EventGrid(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [contentLength,setContentLength] = React.useState(100)
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [ind , setInd]= useState(0)
    const images = props.event.images.map((image)=>config.base_url+"event/image/"+image)
    const handleLeftButton = ()=>{
        setInd(ind===0?props.event.images.length-1:ind-1)
    }
    const handleRightButton = ()=>{
        setInd((ind+1)%props.event.images.length)
    }
    const handleMoreClick = ()=>{
        setContentLength(props.event.content.length)
    }
    // const handleLessClick = ()=>{
    //     setContentLength(100)
    // }
    const handleBulletClick = (index)=>{
        setInd(index)
    }
    const bulletButton = props.event.images.map((image,i)=> <Bullet key={i} index={i} ind={ind} handleBulletClick={handleBulletClick} />)
    return(
                    <Grid item key={props.event._id} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                        >
                        <Box
                        sx={{
                            height: 350,
                            // mt: '10%',
                            display: 'flex',
                            position: 'relative',
                            flexDirection: 'column', 
                            bgcolor: '#000000'
                        }}
                        >
                            <div
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            style={{
                                position:'absolute',
                                width:'200px',
                                height:'100%',
                                padding:0,
                                margin:'auto',
                                left:'30px',
                                top:'0px'
                            // 16:9
                             
                            }}
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            >
                            </div>
                            <CardMedia
                            // aria-owns={open ? 'mouse-over-popover' : undefined}
                            component="img"
                            sx={{
                                width:'100%',
                                maxHeight:'100%',
                                p:0,
                                m:'auto'
                            // 16:9
                             
                            }}
                            image={images[ind]}
                            alt="No image"
                            />
                             {images.length !==1 ? <Button sx={{position:'absolute', p:'0px',minWidth:'0px', top:'50%'}} onClick={handleLeftButton} ><ArrowBackIosNewIcon sx={{color:'gray'}} /></Button> : null}
                             {images.length !==1 ?<Button sx={{position:'absolute',right:'0px',p:'0px',minWidth:'0px', top:'50%'}} onClick={handleRightButton}><ArrowForwardIosIcon sx={{color:'gray'}} /></Button> : null}
                             <div className="fifth-div" style={{margin: "0px 0px 0px -"+props.event.images.length*13/2+"px"}}>
                               {bulletButton}
                            </div>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                pointerEvents: 'none',
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <CardMedia
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                component="img"
                                sx={{
                                    width:'400px',
                                    Height:'100%',
                                    p:0,
                                    m:'auto'
                                // 16:9
                                
                                }}
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                                image={images[ind]}
                                alt="No image"
                                />
                            </Popover>
                        </Box>
                        <CardContent sx={{ flexGrow: 1 }}>
                            {/* <Typography gutterBottom variant="h5" component="h2">
                            {props.event.title}
                            </Typography> */}
                            <Typography>
                            {props.event.content.length <100?props.event.content:props.event.content.substring(0,contentLength)}
                            {props.event.content.length>=100 && contentLength === 100 ?"...":""}
                            {props.event.content.length>=100 && contentLength === 100 ?<Button variant="text" size='small' onClick={handleMoreClick}>show more</Button>:""}
                            {/* {props.event.content.length === contentLength ?<Button variant="text" size='small' onClick={handleLessClick}>show less</Button>:""} */}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
    )
}