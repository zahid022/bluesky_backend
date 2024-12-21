const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const validationMiddleware = require("../middlewares/validation.middleware")
const followValidation = require("../validations/follow.validation")
const followController = require("../controllers/follow.controller")

const followRouter = Router()

followRouter.get("/followers", authMiddleware, followController.getFollowers)
followRouter.get("/following", authMiddleware, followController.getFollowing)
followRouter.get("/check/:id", authMiddleware, followController.checkFollow)
followRouter.get('/notification', authMiddleware, followController.followNotification)

followRouter.post("/", authMiddleware, validationMiddleware(followValidation.followRequest), followController.followRequest)
followRouter.post("/accept", authMiddleware, validationMiddleware(followValidation.accept), followController.accept)
followRouter.post("/reject", authMiddleware, validationMiddleware(followValidation.reject), followController.reject)

module.exports = followRouter   