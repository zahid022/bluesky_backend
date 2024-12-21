const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const { ConflictError, NotFoundError } = require("../utils/error.utils")
const { encodePayload } = require("../utils/jwt.utils")

const login = async (params) => {
    let user = await User.findOne({ username: params.username }).lean().populate("avatar").populate("background")

    if (!user) throw new NotFoundError("username or password is wrong")

    let checkPassword = await bcrypt.compare(params.password, user.password)

    if (!checkPassword) throw new NotFoundError("username or password is wrong")

    let token = encodePayload({ userId: user._id })

    return token
}

const register = async (params) => {
    let emailCheck = await User.findOne({ email: params.email })

    if (emailCheck) throw new ConflictError("Email is already exists")

    let usernameCheck = await User.findOne({ username: params.username })

    if (usernameCheck) throw new ConflictError("Username is already exists")

    let user = new User(params)

    await user.save()

    return true
}

const authService = {
    login,
    register
}

module.exports = authService