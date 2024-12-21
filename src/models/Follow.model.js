const {Schema, model} = require("mongoose")

const followSchema = new Schema({
    followedId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    followingId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    accept : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

const Follow = model("Follow", followSchema)

module.exports = Follow