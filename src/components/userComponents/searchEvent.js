import React, { useState,useEffect } from "react";
import config from "../../config/config";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import EventGrid from './eventGrid'
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';



export default function SearchEvent(){
    const {input} = useParams();
    const inputs = input.toLowerCase().split(' ')
    let maxLength = 0
    inputs.forEach((inp)=>{maxLength = Math.max(inp.length,maxLength)})
    const [events,setEvents]= useState([])
    useEffect(()=>{
        axios.get(config.base_url+"event/")
            .then((res)=>{
                setEvents(res.data) 
            })
            .catch((err)=>{
                console.log(err)
            })
    },[input])
    const inputMap = new Map()
    events.forEach((event)=>{
        const hash = event.hashTags.toLowerCase()
        let maxCount=0
            for(let i=0;i<hash.length;i++)
            {
                
                
                for(const x of inputs)
                {
                    let count=0;
                    for(let j=0;j<x.length;j++)
                    {
                        if(hash[i+j]!==x[j])
                        {
                            break;
                        }
                        else{
                            count++;
                        }
                    }
                    if(count>maxCount) maxCount=count;
                }
                
            }
        if(inputMap.has(maxCount))
        {
            inputMap.get(maxCount).push(event)
        }
        else{
            inputMap.set(maxCount,[event])
        }
    })
    const eventsSearched = []
    for(let i=maxLength;i>=0;i--)
    {
        if(inputMap.has(i))
        {
            for(const x of inputMap.get(i))
            {
                eventsSearched.push(x)
            }
        }
    }
    const [page,setPage] = useState(1)
    const handlePagination = (event,p)=>{
        setPage(p)
    }
    const eventsOnPage = page*6<=eventsSearched.length ? eventsSearched.slice((page-1)*6,6):eventsSearched.slice((page-1)*6,eventsSearched.length)
    return(
        <div className="container">
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {eventsOnPage.map((ev) => {
                        return <EventGrid event={ev} key={ev._id} />
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
