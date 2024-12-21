const { isValidObjectId } = require("mongoose");
const Tweet = require("../models/Tweet.model")
const { NotFoundError, ValidationError } = require("../utils/error.utils")
const followService = require("./follow.service");
const Comment = require("../models/Comment.model");

const tweet = async (id) => {

    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid tweet ID");
    }

    let tweet = await Tweet.findById(id).populate({
        path: 'userId',
        populate: {
            path: 'avatar',
        },
    }).lean()

    if (!tweet) throw new NotFoundError("Tweet is not found")

    tweet = {
        ...tweet,
        userId: {
            avatar: tweet.userId.avatar,
            username: tweet.userId.username,
            email: tweet.userId.email,
            id : tweet.userId._id
        }
    }

    return tweet
}

const listByUser = async (id, filter = {}) => {

    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid user ID");
    }

    filter.page = filter.page || 1
    filter.limit = filter.limit || 10

    const skip = (filter.page - 1) * filter.limit

    let tweets = await Tweet.find({ userId: id })
        .sort({ createdAt: "desc" })
        .skip(skip)
        .populate({
            path: 'userId',
            populate: {
                path: 'avatar',
            },
        })
        .limit(filter.limit)
        .lean()

    tweets = tweets.map((item) => {
        return {
            ...item,
            userId: {
                avatar: item.userId.avatar,
                username: item.userId.username,
                email: item.userId.email,
                id : item.userId._id
            }
        }
    })

    return {
        page: filter.page,
        limit: filter.limit,
        tweets
    }
}

const listByFollowing = async (id, filter = {}) => {
    filter.page = filter.page || 1
    filter.limit = filter.limit || 10

    const skip = (filter.page - 1) * filter.limit

    let following = await followService.getFollowing(id)

    if (following.length === 0) return []

    let followIds = following.map(item => item.id)

    let tweets = await Tweet.find({ userId: { $in: followIds } })
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(filter.limit)
        .populate({
            path: 'userId',
            populate: {
                path: 'avatar',
            },
        })
        .populate("media")
        .lean()

    tweets = tweets.map(tweet => ({
        ...tweet,
        userId: {
            avatar: tweet.userId?.avatar || null,
            id: tweet.userId?._id,
            username: tweet.userId?.username,
        }
    }));

    return {
        page: filter.page,
        limit: filter.limit,
        tweets
    }
}

const trend = async (filter = {}, id) => {
    filter.page = filter.page || 1;
    filter.limit = filter.limit || 10;

    const skip = (filter.page - 1) * filter.limit;

    let tweets = await Tweet.find({ userId: { $ne: id } })
        .sort({ like: -1, createdAt: -1 })
        .skip(skip)
        .limit(filter.limit)
        .populate({
            path: 'userId',
            populate: {
                path: 'avatar',
            },
        })
        .populate("media")
        .lean();

    tweets = tweets.map(tweet => ({
        ...tweet,
        userId: {
            avatar: tweet.userId?.avatar || null,
            id: tweet.userId?._id,
            username: tweet.userId?.username,
        }
    }));

    return {
        page: filter.page,
        limit: filter.limit,
        tweets
    };
};

const create = async (user, params) => {
    let tweet = new Tweet({
        userId: user._id,
        title: params.title,
        media: params.media ? params.media : null
    })

    await tweet.save()

    return tweet
}

const update = async (id, params) => {

    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid tweet ID");
    }

    let tweet = await Tweet.findById(id)

    if (!tweet) throw new NotFoundError("Tweet is not found")

    for (let [key, value] of Object.entries(params)) {
        tweet[key] = value
    }

    await tweet.save()

    return tweet
}

const deleteTweet = async (user_id, id) => {

    if (!isValidObjectId(id)) {
        throw new ValidationError("Invalid tweet ID");
    }

    let result = await Tweet.findOneAndDelete({ userId: user_id, _id: id })

    if (!result) throw new NotFoundError("Tweet is not found")

    await Comment.deleteMany({ tweetId: id })

    return true
}

const tweetService = {
    tweet,
    listByUser,
    listByFollowing,
    trend,
    create,
    update,
    deleteTweet
}

module.exports = tweetService