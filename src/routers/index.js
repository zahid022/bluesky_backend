const {Router} = require("express")
const authRouter = require("./auth.route")
const uploadRouter = require("./upload.route")
const tweetRouter = require("./tweet.route")
const followRouter = require("./follow.route")
const likeRouter = require("./like.route")
const commentRouter = require("./comment.route")
const userRouter = require("./user.route")

const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/upload", uploadRouter)
router.use("/tweet", tweetRouter)
router.use("/follow", followRouter)
router.use("/like", likeRouter)
router.use("/comment", commentRouter)

module.exports = router