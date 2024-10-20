const { mongo } = require("mongoose");

const mongoose = reqire("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Type.objectId,
        required:true,
        ref:"User",
    },
    rating: {
        type:Number,
        requred:true,
    },
    review: {
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("RatingAandReview", ratingAndReviewSchema)