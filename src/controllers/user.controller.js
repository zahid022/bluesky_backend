const userService = require("../services/user.service")

const list = async (req, res, next) => {
    try {
        let result = await userService.list(req.query, req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const myProfile = async (req, res, next) => {
    try {
        let result = await userService.myProfile(req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        let result = await userService.getUser(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let result = await userService.update(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const userController = {
    list,
    myProfile,
    getUser,
    update
}

module.exports = userController