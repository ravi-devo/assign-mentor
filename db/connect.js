const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect("mongodb+srv://ravi-devo:Rayu1005@mypractise.jknnuwg.mongodb.net/?retryWrites=true&w=majority");
        console.log("DB connection established.")
    } catch (error) {
        console.log("Error while connecting DB: ", error);
    }
}

module.exports = db;