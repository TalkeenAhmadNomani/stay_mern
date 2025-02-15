const express = require("express");
const router = express.Router();
const multer  = require('multer')


const wrapasync = require("../utils/wrapasync");
const ExpressError = require("../utils/expressError");
const { listingSchema } = require("../schema.js");
const {storage} = require("../cloudconfig.js")

const { isLoggedIn, isOwner} = require("../middleware.js");
const ListingController = require("../controllers/listing.js");

const upload = multer({ storage })
// Validation middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(detail => detail.message).join(', '));
    } else {
        next();
    }
};

// Routes

// Show all listings
router
.route("/")
.get(wrapasync(ListingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing, 
    wrapasync(ListingController.newlisting)
);
 
// Create new listing form
router.get("/new", isLoggedIn, ListingController.newlistingform);

// Show single listing along with its reviews


router.get("/:id", wrapasync(ListingController.show));


// Create new listing in the database


// Edit an existing listing
router.get("/:id/edit", isLoggedIn,isOwner, wrapasync(ListingController.edit));

// Update an existing listing
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapasync(ListingController.update));
// delete route
router.delete("/:id", isLoggedIn, isOwner, wrapasync(ListingController.destroy));

module.exports = router;