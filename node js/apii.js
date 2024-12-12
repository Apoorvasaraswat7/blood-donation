/*const express = require('express');
const dbConnect = require('./mongodb');
const app = express();

app.use(express.json());

app.get('/', async(req, resp) => {
    let data = await dbConnect();
    data =await data.find().toArray();
    resp.send(data);
})

app.post('/',async (req,resp)=>{
  
    let data = await dbConnect();
    let result = await data.insertOne(req.body);
    resp.send(result);
})

app.put("/",async(req,resp)=>{
    let data = await dbConnect();
    let result = await data.updateOne(
        {name:"apoorva"},
        {$set:req.body}
    )
    resp.send({result:"update"});
})

app.delete("/",async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.deleteOne({name:"anurag"}); 
    resp.send({result:"updated"});
})

app.listen(3000);
*/
const mongoose = require('mongoose');

const main =async ()=>{
    await mongoose.connect("mongodb://localhost:27017/e-com");
    const ProductSchema = new mongoose.Schema({
        name:String
    });

    const productsModel = mongoose.model('products',ProductSchema);
    let data = new ProductsModel({name:"saraswat"});
    let result = await data.save();
    console.log(result);
}

main();