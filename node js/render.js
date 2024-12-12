const express = require('express'); 
const app = express();

app.get('',(req,res)=>{
    res.send("<h1>welcome,to home page<h1>");
});

app.listen(3000);