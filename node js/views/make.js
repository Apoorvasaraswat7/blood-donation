const express = require('express');
const app = express();

app.get("/home",(req,resp)=>{
    resp.send("hello world");
})

app.listen(3000);