const { isValidObjectId } = require("mongoose")
const Follow = require("../models/Follow.model")
const User = require("../models/User.model")
const { ConflictError, NotFoundError, ValidationError, BadRequestError } = require("../utils/error.utils")

const getFollowers = async (id) => {
    let followers = await Follow.find({ followedId: { $in: id }, accept: true }).populate({
        path: 'followingId',
        populate: {
            path: 'avatar',
        },
    })

    if (!followers) return []

    let followersUser = followers.map(item => {
        let user = item.followingId

        return {
            id: user._id,
            username: user.username,
            avatar: user.avatar
        }
    })

    return followersUser
}

const getFollowing = async (id) => {
    let followings = await Follow.find({ followingId: { $in: id }, accept: true }).populate({
        path: 'followedId',
        populate: {
            path: 'avatar',
        },
    })

    if (!followings) return []

    let followingUser = followings.map(item => {
        let user = item.followedId

        return {
            id: user._id,
            username: user.username,
            avatar: user.avatar
        }
    })

    return followingUser
}

const checkFollow = async (followedId, followingId) => {
    if (!isValidObjectId(followedId)) {
        throw new ValidationError("Invalid user ID");
    }

    let check = await Follow.findOne({ followedId: followedId, followingId: followingId })

    if (!check) return "Follow"

    if (check.accept) {
        return "Following"
    } else {
        return "Pending"
    }
}

const followRequest = async (id, params) => {

    if (id.toString() === params.followedId.toString()) {
        throw new BadRequestError("Bad request")
    }

    let checkFollow = await Follow.find({
        followedId: params.followedId,
        followingId: id
    })

    if (checkFollow.length !== 0) throw new ConflictError("You are already following this user.")

    let followedUser = await User.findById(params.followedId)

    if (!followedUser) throw new NotFoundError("User is not found")

    let follow = new Follow({
        followedId: params.followedId,
        followingId: id,
        accept: followedUser.role === "public" ? true : false
    })

    await follow.save()

    if (followedUser.role === "public") {
        await followersCount(params.followedId)
        await followingCount(id)
    }

    return follow
}

const accept = async (id, params) => {
    let follow = await Follow.findOne({
        followedId: id,
        followingId: params.followingId
    })

    if (!follow) throw new NotFoundError("Follow is not found")

    follow.accept = true

    follow.save()

    await followersCount(id)
    await followingCount(params.followingId)

    return follow
}

const followersCount = async (id) => {
    let user = await User.findById(id)

    if (!user) throw new NotFoundError("User is not found")

    let followersCount = await Follow.countDocuments({
        followedId: id,
        accept: true
    });

    user.followers = followersCount

    await user.save()
};

const followingCount = async (id) => {
    let user = await User.findById(id)

    if (!user) throw new NotFoundError("User is not found")

    let followingCount = await Follow.countDocuments({
        followingId: id,
        accept: true
    });

    user.following = followingCount

    await user.save()
};

const reject = async (id, params) => {

    let check = Object.keys(params)

    if (check.length > 1) throw new ValidationError("Parameter is wrong")
        console.log(id)

    if (params.followingId) {
        let result = await Follow.findOneAndDelete({
            followedId: id,
            followingId: params.followingId
        })

        if (!result) throw new NotFoundError("Follow is not found")

        await followersCount(id)
        await followingCount(params.followingId)

    } else if (params.followedId) {
        let result = await Follow.findOneAndDelete({
            followedId: params.followedId,
            followingId: id
        })

        if (!result) throw new NotFoundError("Follow is not found")

        await followersCount(params.followedId)
        await followingCount(id)
    } else {
        throw new ValidationError("Parameter is wrong")
    }

    return true
}

const followNotification = async (id) => {
    let notifications = await Follow.find({ followedId: id, accept: false }).populate("followingId").lean()
    
    notifications = notifications.map((notification) => ({
        ...notification,
        followingId: {
            avatar: notification.followingId?.avatar,
            id: notification.followingId?._id ,
            username: notification.followingId?.username,
        },
    }));

    return notifications
}



const followService = {
    getFollowers,
    getFollowing,
    followRequest,
    checkFollow,
    accept,
    reject,
    followNotification
}

module.exports = followService