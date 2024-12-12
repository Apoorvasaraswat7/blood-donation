const http = require('http');
const fs = require('fs');
const fileContent = fs.readFileSync('index.html');


const server = http.createServer((req,resp)=>{
    resp.writeHead(200,{'content-type': ' text/html'});
    resp.end(fileContent);
})

server.listen(3000);