const collection = require("../mongodb");
const admincollection = require("../adminmongodb");
const bloodcollection = require("../bloodmongodb");
const eventcollection = require("../eventmongodb");
const imagecollection = require("../imagemongodb");
const express = require('express');
const router = express.Router();
const session = require("express-session");
const { Collection } = require("mongoose");

router.use(
    session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false
}))

const isAuth = ( req, res , next)=>{
    if (req.session.isAuth) {
        next();
    }
    else {
        res.redirect('/admin/login');
    }
}

const addeventView = async (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/addevent');
}

// event post  

const eventadd =  async(req, res, next) => {

    const data = {

        image:req.body.image,
        name:req.body.name,
        city:req.body.city,
        description:req.body.description,
        date:req.body.date,
        timeFrom:req.body.timeFrom,
        timeTo:req.body.timeTo,
        qrimage:req.body.qrimage


    };
    try {
        await eventcollection.create(data);
        res.redirect("/admin/eventlist"); // corrected redirect URL
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


    

}

//image

const addimageView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/addimage');
}

const imagelistView = (req, res, next) => {
    req.session.isAuth = true;
    imagecollection.find({})
    .then((x)=>{  
    res.render('admin/imagelist', { x });
    })
    .catch((y)=>{
        console.log(y)
    })
}

// image post 

const imageadd =  async(req, res, next) => {

    const data = {

        image:req.body.image,
        date:req.body.date
        
    };
    try {
        await imagecollection.create(data);
        res.redirect("/admin/imagelist"); // corrected redirect URL
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


    

}

const changepasswordView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/changepassword');
}

const dashboardView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/dashboard');
}

// add donor
 
const adddonorView = async (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/adddonor', { user: {} }); // Pass an empty object to the template
}

const donoradd =  async(req, res, next) => {

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

    };
    try {
        await collection.create(data);
        res.redirect("/admin/adddonor"); // corrected redirect URL
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


    

}


const donorlistView = (req, res, next) => {
    req.session.isAuth = true;
    collection.find({})
    .then((x)=>{
     res.render('admin/donorlist', { x });
    })
    .catch((y)=>{
        console.log(y)
    })
}



const forgotpasswordView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/forgotpassword');
}

const loginView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/login');
}

const eventlistView = (req, res, next) => {
    req.session.isAuth = true;
    eventcollection.find({})
    .then((x)=>{  
    res.render('admin/eventlist', { x });
    })
    .catch((y)=>{
        console.log(y)
    })
   
    // res.render('admin/eventlist');
}

const profileView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('admin/profile');
}

const bloodrequestsView = (req, res, next) => {
    req.session.isAuth = true;
    bloodcollection.find({})
    .then((x)=>{
     res.render('admin/bloodrequests', { x });
    })
    .catch((y)=>{
        console.log(y)
    })
}

// update register

const editLoad = async(req, res) => {

    try {
        const id = req.query.id;
        const userData = await collection.findById({_id:id });

        if(userData){

           res.render('admin/edit',{ user:userData });

        }
        else{
            res.redirect('/admin/dashboard')
        }

    } catch (error) {

        console.log(error.message);
        
    }
}

const renderEditEventForm = async(req, res, next) => {

    try {
        const id = req.query.id;
        const userData = await collection.findById({_id:id });

        if(userData){

           res.render('admin/editEvent',{ user:userData });

        }
        else{
            res.redirect('/admin/dashboard')
        }

    } catch (error) {

        console.log(error.message);
        
    }
}


const updateUsers = async (req, res, next) => {
    try {
        const id = req.body.id; // ID of the user to update
        const updatedData = {
            name: req.body.name,
            group: req.body.group,
            number: req.body.number,
            age: req.body.age,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            state: req.body.state,
            password: req.body.password
        };
        // Find the user by ID and update the data
        await collection.findByIdAndUpdate({ _id: id }, { $set: updatedData });
        res.redirect("/admin/donorlist"); // Redirect to donor list page after successful update
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};


// const updateUsers = async(req,res,next) => {
//     try {
//         collection.findByIdAndUpdate({ _id:req.body.id},{ $set:{name:req.body.name , group:req.body.group ,number:req.body.number , age:req.body.age , email:req.body.email , gender:req.body.gender , address:req.body.address , city:req.body.city , pincode:req.body.pincode , state:req.body.state , password:req.body.password }})
//     } catch (error) {
//         console.log(error.message)
//     }
// }




//delete users

const deleteDonor = async(req, res, next) => {
    req.session.isAuth = true;
    try {
        const id = req.query.id;
        await collection.deleteOne({_id : id})
        res.redirect('donorlist')

    } catch (error) {
        console.log(error.message);
    }

}

// delete event

const deleteEvent = async(req, res, next) => {
    req.session.isAuth = true;
    try {
        const id = req.query.id;
        await eventcollection.deleteOne({_id : id})
        res.redirect('eventlist')

    } catch (error) {
        console.log(error.message);
    }

}

// edit event 

const editEvents = async(req, res) => {

    try {
        const id = req.query.id;
        const userData = await eventcollection.findById({_id:id });

        if(userData){

           res.render('admin/editEvent',{ user:userData });

        }
        else{
            res.redirect('/admin/dashboard')
        }

    } catch (error) {

        console.log(error.message);
        
    }
}

const updateEvents = async (req, res, next) => {
    try {
        const id = req.body.id; // ID of the event to update
        const updatedData = {
            image:req.body.image,
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            timeFrom: req.body.timeFrom,
            timeTo: req.body.timeTo
        };
        // Find the event by ID and update the data
        await eventcollection.findByIdAndUpdate(id, updatedData);
        res.redirect("/admin/eventlist"); // Redirect to event list page after successful update
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};

//delete image
const deleteimage = async(req, res, next) => {
    req.session.isAuth = true;
    try {
        const id = req.query.id;
        await imagecollection.deleteOne({_id : id})
        res.redirect('imagelist')

    } catch (error) {
        console.log(error.message);
    }

}

// login post 

const login = async (req, res, next) => {
    try {
        
        const check = await admincollection.findOne({ username: req.body.username });
        if (check && check.password === req.body.password) {
            req.session.isAuth = true;
            req.session.isAdmin = true;
            res.redirect('/admin/dashboard');
        } else {
            res.send("Wrong username & password");
        }
    } catch (error) {
        console.error(error);
        res.redirect("/admin/login");
    }
}

// logout 
const logout = (req, res, next) => {
    // Destroy the session to log the user out
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.sendStatus(500);
            return;
        }
        res.redirect('/admin/login'); // Redirect to the login page after logging out
    });
};




module.exports = {

    addeventView,
    addimageView,
    changepasswordView,
    dashboardView,
    donorlistView,
    forgotpasswordView,
    loginView,
    eventlistView,
    profileView,
    bloodrequestsView,
    deleteDonor,
    editLoad,
    updateUsers,
    eventadd,
    deleteEvent,
    renderEditEventForm,
    editEvents,
    updateEvents,
    adddonorView,
    donoradd,
    imageadd,
    imagelistView,
    deleteimage,
    login,
    isAuth: isAuth,
    logout



}





