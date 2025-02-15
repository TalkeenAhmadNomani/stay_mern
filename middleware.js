// we have to put these number of //
//code in evry code thats why we are
// making middleware and injecting in
// the route show that we don,t have to//
// write same things many time
//  many times
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { reviewSchema } = require("./schema.js");
// logged in or not
module.exports.isLoggedIn = ( req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {  //method to check user is loged in or not
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "kuch sharm hai ya nhi... chl ab yaha login kr fir aaage ka kaam krna");
        return res.redirect("/login");
    }
        next();
};
//
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(detail => detail.message).join(', '));
    } else {
        next();
    }
};
// if the listing owner is not equals to current owner 
//so dont provide permission for edit & delete and other routes
module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "q chherta hai dusre ke code ko,,, chla jaa re baaba tu warna bhut danda pdega ");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
// // Middleware to validate review input
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// to deelete review \
module.exports.isReviewAuthor= async (req, res, next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "sudhar jaa kisi aur ka review hai ");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
//to save redirect url // lecture number phase 2 part e 5th video
// after login passport reset the session, so if we use then it will show undefined thats why we are saving to local, and passport doesn,t have access to delete locals 
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
