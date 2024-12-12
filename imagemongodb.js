const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blood")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect mongodb")
})
//

const imageSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required: true

    }
})

const imagecollection=new mongoose.model('image',imageSchema)

module.exports=imagecollection;