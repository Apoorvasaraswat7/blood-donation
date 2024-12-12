const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blood")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect mongodb")
})

const bloodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bloodrequire: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Enable automatic timestamps
});
    

const bloodcollection=new mongoose.model('blood',bloodSchema)

module.exports=bloodcollection;