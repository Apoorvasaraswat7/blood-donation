const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname,'crud');
const fliePath=`${dirPath}/files.txt`;


fs.writeFileSync(fliePath,'this is a simple text file');
fs.readFile(fliePath,'utf8',(err,item)=>{
    console.log(item);
})
fs.appendFile(fliePath,'and file is cfreated by apoorva',(err)=>{
    if(!err) console.log("file is updated");
})
fs.rename(fliePath,`${dirPath}/apoorva.txt`,(err)=>{
    if(!err) console.log("file renamed succesfully")
})
fs.unlinkSync(`${dirPath}/apoorva.txt`);