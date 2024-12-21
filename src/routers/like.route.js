const { Router } = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const likeController = require("../controllers/like.controller")
const validationMiddleware = require("../middlewares/validation.middleware")
const likeValidation = require("../validations/like.validation")

const likeRouter = Router()

likeRouter.post("/:id", authMiddleware, validationMiddleware(likeValidation), likeController.toggle)

module.exports = likeRouter