const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        reqired: true,
    },
    description:{
        type:String,
    },
    courses: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
});

  // Export the Category model
module.exports = mongoose.model("Category", categorySchema);