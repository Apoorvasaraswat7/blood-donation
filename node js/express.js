/*const express = require('express'); 
const path = require('path');

const app = express();
const publicPath = path.join(__dirname,'crud');

app.set('view engine','ejs')


const reqFilter = (req,resp,next)=>{
    if(!req.query.age){
        resp.send("please enter the age");
    }
    else if(req.query.age < 18){
        resp.send("you are not permitted to watch this page")
    }
    else{
        next();
    }
}

/*app.use(reqFilter);

app.get('',(req,resp)=>{
    resp.send("hello this is home page");
})

app.get('/about',reqFilter,(req,resp)=>{
    resp.send("hello this is about page");
})

app.get('/contact',reqFilter,(req,resp)=>{
    resp.send("hello this is contact page ");
})


app.get('',(req,resp)=>{
    resp.sendFile(`${publicPath}/main.html`)
})

app.get('/profile',(req,resp)=>{
    const user={
        name:'apoorva',
        email:'saraswatapooreva',
        city:'bhilwara',
        skills:['node','c++','html']
    }
    resp.render('profile',{user});
})
app.get('/About',(req,resp)=>{
    resp.sendFile(`${publicPath}/About.html`)
})

app.get('/hello',(req,resp)=>{
    const about={
        name:'saraswaat',
        email:'saraswatapooreva',
        city:'bhilwara',
        
    }
    resp.render('hello',{about});
})

app.get('/help',(req,resp)=>{
    resp.sendFile(`${publicPath}/help.html`)
})

app.get('*',(req,resp)=>{
    resp.sendFile(`${publicPath}/nopage.html`)
})

app.listen(3000);
*/
const {MongoClient} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dataBase = 'e-com'
const client = new MongoClient(url);

async function getData()
{
    let result = await client.connect();
    let db = result.db(dataBase);
    let collection = db.collection('products');
    let response = await collection.find({}).toArray();
    console.log(response); 
}
getData();