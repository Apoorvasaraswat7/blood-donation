const express = require('express');
const isAuth  = require('../controllers/admincontroller');
const { loginView,login } = require('../controllers/admincontroller');
const router = express.Router();

// Authentication middleware
function requireLogin(req, res, next) {
    // Check if the user is authenticated
    if (req.session.isAuth && req.session.isAdmin) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/admin/login'); // Assuming you have a login route
    }
}

router.get("/login",loginView);
router.post("/login",login);

// Apply authentication middleware to routes requiring authentication
router.use(requireLogin);

// Routes requiring authentication
router.get("/addevent",isAuth.addeventView);
router.post("/addevent",isAuth.eventadd);
router.get("/addimage",isAuth.addimageView);
router.post("/addimage",isAuth.imageadd);
router.get("/imagelist",isAuth.imagelistView);
router.get("/changepassword",isAuth.changepasswordView);
router.get("/dashboard", isAuth.isAuth, isAuth.dashboardView);
router.get("/donorlist",isAuth.donorlistView);
router.get("/forgotpassword",isAuth.forgotpasswordView);
router.get("/adddonor",isAuth.adddonorView);
router.post("/adddonor",isAuth.donoradd);
router.get("/eventlist",isAuth.eventlistView);
router.get("/profile",isAuth.profileView);
router.get('/edit',isAuth.editLoad)
router.post("/update", isAuth.updateUsers);
router.get('/editEvent',isAuth.editEvents);
router.post("/updateEvent", isAuth.updateEvents);
router.get('/deletedonor',isAuth.deleteDonor);
router.get('/deleteEvent',isAuth.deleteEvent);
router.get('/deleteimage',isAuth.deleteimage);
router.get('/bloodrequests',isAuth.bloodrequestsView);


// Route for the login page
router.get('/logout', isAuth.logout);


module.exports = {
    router: router
}
