const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    avatar : {
        type : Schema.Types.ObjectId,
        default : null,
        ref : "Image"
    },
    background : {
        type : Schema.Types.ObjectId,
        default : null,
        ref : "Image"
    },
    followers : {
        type : Number,
        default : 0
    },
    following : {
        type : Number,
        default : 0
    },
    role : {
        type : String,
        enum : ["public", "private"],
        default : "public"
    }
}, { timestamps: true })

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) next()

    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash

    next()

})

const User = model("User", UserSchema)

module.exports = User