const express = require("express");
const wrapasync = require("../utils/wrapasync");
const router = express.Router();
const userControllers = require("../controllers/user.js")

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


// signup form

router.get("/signup", userControllers.signupForm) 
/// signup 
router.post("/signup", saveRedirectUrl, wrapasync(userControllers.signup));  


// login

router.get("/login",  userControllers.loginForm);

// POST route for login
router.post(
  "/login", saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login", // Redirects back to login on failure
    failureFlash: true, // Enables flash messages for login failure
  }),
 wrapasync(userControllers.login));

//logout user
router.get("/logout", userControllers.logout);





module.exports = router;