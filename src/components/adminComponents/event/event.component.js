import React from "react";
import { Route,Routes } from "react-router-dom"
import EventList from "./eventList.component"
import EventAdd from "./eventAdd.component"


export default function Event(){
    return (
        <Routes>
            <Route exact path="/" element={<EventList />}/>
            <Route exact path="/add" element={<EventAdd />}/>
        </Routes>
    )
}