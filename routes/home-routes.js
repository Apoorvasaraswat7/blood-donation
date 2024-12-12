const express = require('express');
const isAuth  = require('../controllers/homeController');
const router = express.Router();


// const { homeView, aboutView, blogView, contactView, donorView, eventsView, galleryView, eventDetailsView } = require('../controllers/homeController');
// const router = express.Router();


router.get('/',isAuth.homeView);
router.get('/about',isAuth.aboutView);
router.get('/blog',isAuth.blogView);
router.get('/contact',isAuth.contactView);
router.get('/donor',isAuth.donorView);
router.get('/events',isAuth.eventsView);
router.get('/gallery',isAuth.galleryView);
//blood request
router.get('/bloodrequest',isAuth.bloodrequestView);
router.post('/bloodrequest',isAuth.bloodrequest);

// router.get('/send-email',isAuth.sendemail)
router.post('/send-email',isAuth.sendemail)
router.get('/events/:eventId', isAuth.eventDetailsView);


module.exports = {
    router: router
}