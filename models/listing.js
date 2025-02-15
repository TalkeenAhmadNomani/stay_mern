const mongoose = require("mongoose");
const schema = mongoose.Schema;
 const listingschema = new schema({
    title:String,
    description:String,
    
     image: {
        url: String,
        filename: String,
    },
  
    price:Number,
    location:String,
    country:String,
    reviews: [
    {
      type: schema.Types.ObjectId,
      ref: "Review",
    },
  ],
    owner: 
        {
        type: schema.Types.ObjectId,
        ref: "user",
        },
 });
 
 const listing = mongoose.model("listing", listingschema)
 module.exports= listing;
