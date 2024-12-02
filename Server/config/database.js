const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
    throw new Error("Please provide MONGODB_URI in the .env file");
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL); 
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1); 
    }
}

module.exports = connectDB;
