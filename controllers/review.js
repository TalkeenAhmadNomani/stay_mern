const Review = require("../models/review.js"); 


const Listing = require("../models/listing.js");

module.exports.addreview = async (req, res) => {
    const listing = await Listing.findById(req.params.id); // Use 'id' from URL to find listing

    if (!listing) {
        // If the listing is not found, return a 404 error
        return res.status(404).send("Listing not found");
    }

    // Create a new review from the request body
    const newReview = new Review(req.body.review);
    // author 
        newReview.author = req.user._id

    // Save the new review
    await newReview.save();

    // Add the new review to the listing's reviews array
    listing.reviews.push(newReview);

    // Save the updated listing
    await listing.save();

    console.log("Review added");

    // Redirect back to the listing page to show the review
    res.redirect(`/listing/${req.params.id}`);
}



// delete review 

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params; // Get the listing id and review id from the URL

    // Find the listing and remove the review from the reviews array
    const listing = await Listing.findById(id);

    if (!listing) {
        // If the listing is not found, return a 404 error
        return res.status(404).send("Listing not found");
    }

    // Pull (remove) the review from the listing's reviews array
    listing.reviews.pull(reviewId);
    await listing.save();

    // Now delete the review from the Review collection
    await Review.findByIdAndDelete(reviewId);

    console.log("Review deleted");

    // Redirect back to the listing page after deletion
    res.redirect(`/listing/${id}`);
}