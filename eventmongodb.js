const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blood")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect mongodb")
})


const eventSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    timeFrom:{
        type:String
        
    },
    timeTo:{
        type:String
        
    },
    qrimage:{
        type:String,
        required:true
    }
})

const eventcollection=new mongoose.model('event',eventSchema)

module.exports=eventcollection;