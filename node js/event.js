const express = require("express");
const EventEmitter = require("events");
const app = express();
const event =new  EventEmitter();

let count=0

event.on("eventAPI",()=>{
    count++;
    console.log("api called",count)
})

app.get('/',(req,resp)=>{   
    resp.send("api called")
    event.emit("eventAPI");
})

app.get('/upload',(req,resp)=>{
    resp.send("api called")
    event.emit("eventAPI");
})

app.get('/emit',(req,resp)=>{
    resp.send("api called")
    event.emit("eventAPI");
})

app.listen(6000);



