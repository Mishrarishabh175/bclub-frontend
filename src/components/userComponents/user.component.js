import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./home.component"
import About from "./about.component"
import President from "./president.component"
import Navbar from "./navbar.component"
import Events from "./events.component"
import SearchEvent from "./searchEvent"
import Footer from "./footer.component"

export default function  User(){
    return(
        <div>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element = {<About />} />
            <Route path="/president" element={<President />} />
            <Route path="/event" element={<Events />} />
            <Route path="/search/:input" element={<SearchEvent />} />
            </Routes>
            <Footer />
        </div>
        
    )
}