const { isValidObjectId } = require("mongoose")
const User = require("../models/User.model")
const { ConflictError, ValidationError } = require("../utils/error.utils")

const list = async (filter = {}, id) => {
    let query = User.find()

    filter.page = filter.page || 1
    filter.limit = filter.limit || 10

    if (filter.search) {
        query.where("username").regex(new RegExp(filter.search, "i"))
    }
    
    query.where("_id").ne(id);

    let skip = (filter.page - 1) * filter.limit

    query.limit = filter.limit
    query.skip = skip
    query.populate("avatar")
    query.populate("background")
    query.lean()

    let users = await query

    let result = users.map(item => {
        return {
            avatar : item.avatar,
            username : item.username,
            id : item._id,
            email : item.email
        }
    })

    return result
}

const myProfile = async (id) => {
    let user = await User.findById(id).populate("avatar").populate("background").lean()

    let result = { ...user, password: undefined }

    return result
}

const getUser = async (id) => {
    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid user ID");
    }

    let user = await User.findById(id).populate("avatar").populate("background").lean()

    let result = { ...user, password: undefined }

    return result
}

const update = async (id, params) => {
    let user = await User.findById(id)

    if(params.username){
        let checkUsername = await User.findOne({username : params.username})
        if(checkUsername) throw new ConflictError("Username is already exists")
    }

    if(params.email){
        let checkemail = await User.findOne({email : params.email})
        if(checkemail) throw new ConflictError("Email is already exists")
    }

    for(let [key, value] of Object.entries(params)){
        user[key] = value
    }

    await user.save()

    let result = await user.populate([
        { path: "avatar" },
        { path: "background" }
    ]);

    result = result.toObject()

    delete result.password

    return result
}

const userService = {
    list,
    myProfile,
    getUser,
    update
}

module.exports = userService