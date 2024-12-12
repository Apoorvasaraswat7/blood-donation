const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blood")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect mongodb")
})
//

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const admincollection=new mongoose.model('admins',adminSchema)

module.exports=admincollection;