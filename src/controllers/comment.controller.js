const commentServcie = require("../services/comment.service")

const comment = async (req, res, next) => {
    try {
        let result = await commentServcie.comment(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        let result = await commentServcie.create(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const getByTweet = async (req, res, next) => {
    try {
        let result = await commentServcie.getByTweet(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let result = await commentServcie.update(req.user._id, req.params.id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        await commentServcie.deleteComment(req.user._id, req.params.id)
        res.json({message : "Comment is deleted successfully"})
    } catch (err) {
        next(err)
    }
}

const commentController = {
    comment,
    create,
    getByTweet,
    update,
    deleteComment
}

module.exports = commentController