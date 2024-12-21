const { isValidObjectId } = require("mongoose")
const Comment = require("../models/Comment.model")
const { NotFoundError, UnauthorizedError, ValidationError } = require("../utils/error.utils")
const Tweet = require("../models/Tweet.model")

const comment = async (id) => {

    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid comment ID");
    }

    let comment = await Comment.findById(id).populate("userId")

    if (!comment) throw new NotFoundError("Comment is not found")

    return comment
}

const getByTweet = async (id) => {

    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid comment ID");
    }

    let list = await Comment.find({ tweetId: id }).lean().populate({
        path: 'userId',
        populate: {
            path: 'avatar',
        },
    })

    let result = list.filter(item => !item.parentId).map(item => childrenComment(list, item))

    return result
}

const childrenComment = (list, comment) => {
    let children = list.filter(item => item.parentId?.toString() === comment._id.toString()).map(item => childrenComment(list, item))

    return {
        ...comment,
        userId: {
            avatar: comment.userId.avatar,
            username: comment.userId.username,
            id: comment.userId._id,
            email : comment.userId.email
        },
        children: children.length ? children : undefined
    }
}

const create = async (user_id, params) => {

    const tweet = await Tweet.findById(params.tweetId)

    if (!tweet) throw new NotFoundError("Tweet is not found")

    let newComment = new Comment({
        userId: user_id,
        tweetId: params.tweetId,
        content: params.content,
        parentId: params.parentId ? params.parentId : null
    })

    await newComment.save()

    if (params.parentId) {
        let changeComment = await Comment.findById(params.parentId)
        changeComment.commentCount += 1

        changeComment.save()
    } else {
        tweet.comment += 1
    }

    await tweet.save()

    return newComment
}

const update = async (user_id, comment_id, params) => {

    if (!isValidObjectId(comment_id)) {
        throw new ValidationError("Invalid comment ID");
    }

    let comment = await Comment.findById(comment_id)

    if (!comment) throw new NotFoundError("Comment is not found")

    let checkUser = comment.userId.toString() === user_id.toString()

    if (!checkUser) throw new UnauthorizedError("Unauthorized")

    for (let [key, value] of Object.entries(params)) {
        comment[key] = value
    }

    await comment.save()

    return comment
}

const deleteComment = async (user_id, id) => {
    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid comment ID");
    }

    let comment = await Comment.findById(id).populate("tweetId")

    if (!comment) throw new NotFoundError("Comment is not found")


    if (comment.userId.toString() === user_id.toString() || comment.tweetId.userId.toString() === user_id.toString()) {
        await Comment.deleteOne({ _id: id })
    }

    return true
}

const commentServcie = {
    comment,
    getByTweet,
    create,
    update,
    deleteComment
}

module.exports = commentServcie