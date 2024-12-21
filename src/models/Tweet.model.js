const { Schema, model} = require("mongoose")

const tweetSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true
    },
    media : {
        type : Schema.Types.ObjectId,
        ref : "Image",
        default : null
    },
    like : {
        type : Number,
        default : 0
    },
    likeUser : {
        type : [Schema.Types.ObjectId],
        ref : "User",
        default : []
    },
    comment : {
        type : Number,
        default : 0
    },
    reply : {
        type : Number,
        default : 0
    }
}, {timestamps : true})

const Tweet = model("Tweet", tweetSchema)

module.exports = Tweet