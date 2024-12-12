const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/blood")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect mongodb")
})

const RegisterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    group:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// const LoginSchema = new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }

// })

const collection = new mongoose.model('register',RegisterSchema)
// const collection2 = new mongoose.model('login',LoginSchema)

module.exports = collection;
// module.exports = collection2;