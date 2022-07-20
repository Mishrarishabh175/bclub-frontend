import React from "react";
import SubscriberList from "./subscriberList.component"
import SubscriberEdit from "./subscriberEdit.component"
import SubscriberAdd from "./subscriberAdd.component";
import SendMail from "./sendMail.component"
import {Route ,Routes} from "react-router-dom"

export default function Subscriber(){
    return (
        <Routes>
            <Route exact path="/" element={<SubscriberList />}/>
            <Route exact path="/edit/:id" element={<SubscriberEdit />}/>
            <Route exact path="/add" element={<SubscriberAdd />}/>
            <Route exact path="/sendmail" element={<SendMail />}/>
        </Routes>
    )
}