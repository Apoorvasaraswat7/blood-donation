const collection = require("../new admin/mongodb");
const bloodcollection = require("../new admin/bloodmongodb");
const eventcollection = require("../new admin/eventmongodb");
const imagecollection = require("../new admin/imagemongodb");
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const session = require("express-session");

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
        res.redirect('/login');
    }
}

const aboutView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('about');
    // res.render('about');
}

const bloodrequestView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('bloodrequest');
    // res.render('about');
}

const blogView = (req, res, next) => {
    req.session.isAuth = true;
    res.render('blog');
    // res.render('blog');
}

const contactView = (req, res, next) => {
    req.session.isAuth = true;
    const message = req.query.msg; // Get the message from query parameter
    res.render('contact', { message: message });
};


const donorView = (req, res, next) => {
    req.session.isAuth = true;
    collection.find({})
    .then((x)=>{
    res.render('donor', { x });
    })
    .catch((y)=>{
        console.log(y)
    })
}

const eventsView = (req, res, next) => {
    req.session.isAuth = true;
    eventcollection.find({})
    .then((events)=>{
    res.render('events', { events });
    })
    .catch((b)=>{
        console.log(b)
    })
}

const galleryView = (req, res, next) => {
    req.session.isAuth = true;
    const currentDate = new Date(); // Get current date and time
    imagecollection.find({})
    .then((image)=>{
        res.render('gallery', { image }); // Pass currentDate to the rendering template
    })
    .catch((error)=>{
        console.log(error);
    });
};

const homeView = (req, res, next) => {
    req.session.isAuth = true;
    Promise.all([
        eventcollection.find({}).sort({ createdAt: 1 }).limit(3),
        imagecollection.find({}).sort({ createdAt: 1 }).limit(3)
    ])
    .then(([eventshome, imagehome]) => {
        res.render('home', { eventshome, imagehome });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error fetching data');
    });
}

const eventDetailsView = (req, res) => {
    req.session.isAuth = true;
    const eventId = req.params.eventId;
    // Fetch event details based on eventId
    eventcollection.findById(eventId)
        .then(event => {
            if (!event) {
                return res.status(404).send('Event not found');
            }
            res.render('blog', { event: event });
        })
        .catch(error => {
            console.error('Error fetching event details:', error);
            res.status(500).send('Internal Server Error');
        });
}

const sendemail = async (req, res, next) => {
    const { name, email, message } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'whomanishsoni@gmail.com', // replace with your email address
            pass: 'vahu cwqd frbe gqxm' // replace with your email password
        }
    });

    // Email message options
    let mailOptions = {
        from: 'whomanishsoni@gmail.com', // sender address
        to: 'whomanishsoni@gmail.com', // list of receivers
        subject: 'New Contact Form Submission', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: %s', info.messageId);
            res.redirect('contact?msg=Email sent successfully');
        }
    });
}
// blood request
const bloodrequest =  async(req, res, next) => {

    const data = {

        
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        bloodrequire:req.body.bloodrequire,
        message:req.body.message,
        createdAt: new Date()
        


    };
    try {
        await bloodcollection.create(data);
        res.redirect("bloodrequest"); // corrected redirect URL
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


    

}

module.exports ={

    aboutView,
    blogView,
    contactView,
    donorView,
    eventsView,
    galleryView,
    homeView,
    eventDetailsView,
    sendemail,
    bloodrequestView,
    bloodrequest

  

}