const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-com');


const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    brand:String
});

const save = async ()=>{
    const product = mongoose.model('products',productSchema);
    let data = new product({
        name:"galaxy",
        price: 15000,
        brand:"samsung",
    });
    let result =await data.save();
    console.log(result);
}

const update = async ()=>{
    const product = mongoose.model('products',productSchema);
    let data = await product.updateOne(
        {name:"m8"},
        {
            $set:{price:3000}
        }
    )
    console.log(data);
}

const deleteDb = async ()=>{
    const product = mongoose.model('products',productSchema);
    let data = await product.deleteOne({name:"max 100"})
    console.log(data);
}


const find = async ()=>{
    const product = mongoose.model('products',productSchema);
    let data = await product.find({name:"soeel"});
    console.log(data);
}



