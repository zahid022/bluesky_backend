const {Schema, model} = require("mongoose")

const likeSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    tweetId : {
        type : Schema.Types.ObjectId,
        ref : "Tweet",
        required : true
    },
    commentId : {
        type : Schema.Types.ObjectId,
        ref : "Comment",
        default : null
    }
}, {timestamps : true})

const Like = model("Like", likeSchema)

module.exports = Like