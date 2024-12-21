const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const validationMiddleware = require("../middlewares/validation.middleware")
const tweetValidation = require("../validations/tweet.validation")
const tweetController = require("../controllers/tweet.controller")
const paginationValidation = require("../validations/pagination.validation")

const tweetRouter = Router()

tweetRouter.get('/user/:id', authMiddleware, validationMiddleware(paginationValidation, "query"), tweetController.listByUser)
tweetRouter.get('/myFollow', authMiddleware, validationMiddleware(paginationValidation,"query"), tweetController.listByFollowing)
tweetRouter.get("/trend",authMiddleware, validationMiddleware(paginationValidation,"query"), tweetController.trend)
tweetRouter.get("/:id", tweetController.tweet)

tweetRouter.post("/", authMiddleware, validationMiddleware(tweetValidation.create), tweetController.create)
tweetRouter.post("/:id", authMiddleware, validationMiddleware(tweetValidation.update), tweetController.update)

tweetRouter.delete("/:id", authMiddleware, tweetController.deleteTweet)

module.exports = tweetRouter