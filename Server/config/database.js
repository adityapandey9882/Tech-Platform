const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
    throw new Error("Please provide DATABASE_URL in the .env file");
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL); 
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB connection error:", error);
        process.exit(1); 
    }
}

module.exports = connectDB;

// exports.connect = () => {
//     mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology:true,
//     })
//     .then(() => console.log("DB Connected Successfully"))
//     .catch( (error) => {
//         console.log("DB Connection Failed");
//         console.error(error);
//         process.exit(1);
//     } )
// };
