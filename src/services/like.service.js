const { isValidObjectId } = require("mongoose");
const Like = require("../models/Like.model");
const commentServcie = require("./comment.service");
const { ValidationError } = require("../utils/error.utils");
const Tweet = require("../models/Tweet.model");

const toggle = async (user_id, tweet_id, params) => {
    let like = null

    if (!isValidObjectId(tweet_id)) {
        throw new ValidationError("Invalid tweet ID");
    }

    if (params.commentId) {
        like = await Like.findOne({ userId: user_id, tweetId: tweet_id, commentId: params.commentId });
    } else {
        like = await Like.findOne({ userId: user_id, tweetId: tweet_id, commentId : null });
    }

    if (like) {
        await Like.deleteOne({ _id: like._id });
        params.commentId ? await changeCommentLike(params.commentId, -1, user_id) : await changeTweetLike(tweet_id, -1, user_id)
        return { message: "Like is removed" };
    } else {
        const newLike = new Like({
            userId: user_id,
            tweetId: tweet_id,
            commentId: params.commentId || null
        });

        await newLike.save()

        params.commentId ? await changeCommentLike(params.commentId, 1, user_id) : await changeTweetLike(tweet_id, 1, user_id)
        return newLike
    }
};

const changeTweetLike = async (id, x, userId) => {
    try {
        let tweet = await Tweet.findById(id);

        if (!tweet) {
            throw new Error("Tweet not found");
        }

        tweet.like += x;

        if (x > 0) {
            if (!tweet.likeUser.includes(userId)) {
                tweet.likeUser.push(userId);
            }
        } else {
            tweet.likeUser = tweet.likeUser.filter(item => item.toString() !== userId.toString());
        }

        await tweet.save();
    } catch (error) {
        console.error("Error in changeTweetLike:", error.message);
        return false
    }
};

const changeCommentLike = async (id, x, userId) => {
    let comment = await commentServcie.comment(id)

    comment.like += x

    if(x > 0){
        if(!comment.likeUser.includes(userId)){
            comment.likeUser.push(userId)
        }
    }else{
        comment.likeUser = comment.likeUser.filter((item) => item.toString() !== userId.toString())
    }

    await comment.save()
}

const likeService = {
    toggle
}

module.exports = likeService