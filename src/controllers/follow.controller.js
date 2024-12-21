const followService = require("../services/follow.service")

const getFollowers = async (req, res, next) => {
    try {
        let result = await followService.getFollowers(req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const getFollowing = async (req, res, next) => {
    try {
        let result = await followService.getFollowing(req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const checkFollow = async (req, res, next) => {
    try {
        let result = await followService.checkFollow(req.params.id, req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const followRequest = async (req, res, next) => {
    try {
        let result = await followService.followRequest(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const accept = async (req, res, next) => {
    try {
        let result = await followService.accept(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const reject = async (req, res, next) => {
    try {
        await followService.reject(req.user._id, req.body)
        res.json({message : "follow deleted is successfully"})
    } catch (err) {
        next(err)
    }
}

const followNotification = async (req, res, next) => {
    try {
        let result = await followService.followNotification(req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const followController = {
    getFollowers,
    getFollowing,
    followRequest,
    checkFollow,
    accept,
    reject,
    followNotification
}

module.exports = followController