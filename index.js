const expressLayouts = require('express-ejs-layouts');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const admincollection = require("./adminmongodb");
const bodyParser = require('body-parser');
const session = require('express-session');
const collection = require("./mongodb");
const express = require('express');
const path = require('path');
const ejs = require('ejs'); 
const app = express();

// admin session
app.use(
    session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false
})) 

// <% x.forEach((y) => { %>
//     <tr>
//         <td><%= y.name %></td>
//         <td><%= y.group %></td>
//         <td><%= y.number %></td>
//         <td><%= y.address %></td>
//         <td><%= y.city %></td>
//         <td><%= y.state %></td>
//         <td>
//             <!-- Add buttons for contact actions -->
//             <a "tel:<%= encodeURIComponent(y.number) %>">
//                 <button class="btn btn-danger">CALL</button>
//             </a>
//             <a "https://api.whatsapp.com/send?phone=<%= encodeURIComponent(y.number) %>" target="_blank">
//                 <button class="btn btn-success">WhatsApp</button>
//             </a>
//         </td>
//     </tr>
// <% }) %>




app.use(expressLayouts);
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'views/admin')));
app.use('/',homeRoutes.router);
app.use('/admin',adminRoutes.router);


app.post("/", async(req,resp)=>{

    const data = {

        name:req.body.name,
        group:req.body.group,
        number:req.body.number,
        age:req.body.age,
        email:req.body.email,
        gender:req.body.gender,
        address:req.body.address,
        city:req.body.city,
        pincode:req.body.pincode,
        state:req.body.state,
        password:req.body.password

    }

    try {
        await collection.create(data);
        resp.redirect("/");
      } catch (error) {
        console.error(error.msg);
        resp.status(500).send("Internal Server Error");
      }
    

})

app.post("/login",async (req,res)=>{
    
    try {
        const check = await admincollection.findOne({username:req.body.username})

        if(check.password===req.body.password){
            req.session.isAuth = true ;
            res.redirect('admin/dashboard')
        }
        else{
            res.send("wrong username & Password")
        }
    } catch {
        res.redirect("Email & Password Not Valid ")
    }
})



app.listen(3000, () => console.log('App is listening on url http://localhost:3000'));