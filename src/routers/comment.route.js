const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const validationMiddleware = require("../middlewares/validation.middleware")
const commentValidation = require("../validations/comment.validation")
const commentController = require("../controllers/comment.controller")

const commentRouter = Router()

commentRouter.get("/single/:id", commentController.comment)
commentRouter.get("/:id", commentController.getByTweet)

commentRouter.post("/", authMiddleware, validationMiddleware(commentValidation.create), commentController.create)
commentRouter.post("/:id", authMiddleware, validationMiddleware(commentValidation.update), commentController.update)

commentRouter.delete("/:id", authMiddleware, commentController.deleteComment)

module.exports = commentRouter