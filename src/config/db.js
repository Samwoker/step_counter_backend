
const mongoose = require("mongoose");
require("dotenv").config()

const connectDb = async()=>{
    const mongoUri = process.env.MONGODB_URI
    mongoose.connect(mongoUri)
}

module.exports = connectDb;