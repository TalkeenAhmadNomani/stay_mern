const User = require("../models/user.js")



// signup form
module.exports.signupForm = (req, res)=>{
    res.render("users/signup")
}
// signup
module.exports.signup =async (req, res, next) => {  // Added `next` parameter
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        
        req.login(registeredUser, (err) => {
        if(err) {
          return next(err);
        }
          req.flash("success", "Welcome to Wanderlust");
          let redirect = res.locals.redirectUrl || "/listing";
            res.redirect(redirect);
       
        });

          
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}
// login form 
module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs"); // Renders the login view
}

// login 

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!"); // Flash success message
    let redirect = res.locals.redirectUrl || "/listing";
            res.redirect(redirect);
  }

  // logout 
  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
           return next(err);
        }
        req.flash("success", "chla jaa idhar se");
        res.redirect("/listing");
    });
}