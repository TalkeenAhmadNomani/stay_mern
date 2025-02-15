const express = require("express");
const router = express.Router({mergeParams:true});

const wrapasync = require("../utils/wrapasync");

const ExpressError = require("../utils/expressError.js");

const { isLoggedIn, isReviewAuthor , validateReview} = require("../middleware.js");
const ReviewControllers = require("../controllers/review.js")

// Middleware to validate review input


// POST route to add a review
router.post("/",isLoggedIn, validateReview, wrapasync(ReviewControllers.addreview));

// DELETE route to remove a review
router.delete("/:reviewId", isReviewAuthor, wrapasync(ReviewControllers.deleteReview));

module.exports = router;
