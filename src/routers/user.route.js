const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const paginationValidation = require("../validations/pagination.validation");
const authValidation = require("../validations/auth.validation");

const userRouter = Router()

userRouter.get("/", authMiddleware, validationMiddleware(paginationValidation, "query"), userController.list)
userRouter.get("/me", authMiddleware, userController.myProfile)
userRouter.get("/:id", authMiddleware, userController.getUser)

userRouter.post("/update", authMiddleware, validationMiddleware(authValidation.update), userController.update)

module.exports = userRouter