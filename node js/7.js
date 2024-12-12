const http = require('http');


const dataControl = (req,resp)=>{
    resp.write("hello i am in bhilwara");
    resp.end();
}

http.createServer(dataControl).listen(4501);