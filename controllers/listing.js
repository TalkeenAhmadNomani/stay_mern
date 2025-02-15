const Listing = require("../models/listing.js"); 



 module.exports.index = async (req, res) => {
    const allList = await Listing.find({});
    res.render("listing/index", { allList });
}

// new listing form
module.exports.newlistingform = (req, res) => {

        res.render("listing/new");
};
// show route with review

module.exports.show =async (req, res) => {
    const { id } = req.params;
    
  
    // Fetch the specific listing by ID and populate its reviews and owner
    const list = await Listing.findById(id).populate({
        path:"reviews", 
        populate: {
            path:"author",
        }
    }).populate("owner");

    if (!list) {
        req.flash("error", "Listing not found");
        return res.redirect("/listing");
    }

    if (!list.owner) {
        req.flash("error", "Owner information is missing for this listing.");
        return res.redirect("/listing");
    }

    res.render("listing/show", { list });
}
// new listing in database 


module.exports.newlisting = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = { url, filename };
    await newList.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listing");
}

// edit in existing route

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    let originalimgurl = list.image.url;
let orl = originalimgurl.replace("/upload", "/upload/h_300,w_250");

    res.render("listing/edit", { list, orl });
}

//update in existing route 
module.exports.update =async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}

// destroy any rute

module.exports.destroy = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "listing deleted");
    res.redirect("/listing");
}