const tweetService = require("../services/tweet.service")

const tweet = async (req, res, next) => {
    try {
        let result = await tweetService.tweet(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const listByUser = async (req, res, next) => {
    try {
        let result = await tweetService.listByUser(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const listByFollowing = async (req, res, next) => {
    try {
        let result = await tweetService.listByFollowing(req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const trend = async (req, res, next) => {
    try {
        let result = await tweetService.trend(req.query, req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        let result = await tweetService.create(req.user, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let result = await tweetService.update(req.params.id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const deleteTweet = async (req, res, next) => {
    try {
        await tweetService.deleteTweet(req.user._id, req.params.id)
        res.json({message : "Tweet is deleted successfully"})
    } catch (err) {
        next(err)
    }
}

const tweetController = {
    tweet,
    listByUser,
    listByFollowing,
    trend,
    create,
    update,
    deleteTweet
}

module.exports = tweetController