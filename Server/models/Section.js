const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({

    sectionName: {
        type: String,
    },
    sebSection: [
        {
            type:mongoose.Schema.Types.ObjectId,
            reqired:true,
            ref:"SubSection",
        }
    ],

    
})

module.exports = mongoose.model("Section", sectionSchema);