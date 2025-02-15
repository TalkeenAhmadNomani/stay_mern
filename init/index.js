const mongoose = require("mongoose");
const initdata= require("./data.js");
const listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonder")
}
main().then((res) => {
    console.log("boss database se connect ho gya")
}).catch((err) => {
    console.log(err)
})
const initdb = async ()=> {
    await listing.deleteMany({});
initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("672c98df862c1971633a3965") // Ensure this ID exists in the User collection
}));
    await listing.insertMany(initdata.data)
    console.log("data was saved");
}
initdb();