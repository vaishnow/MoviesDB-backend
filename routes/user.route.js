const express = require("express")
const UserController = require("../controllers/user.controller")
const jwtMiddleware = require("../middlewares/jwt.middleware")

const userRouter = express.Router()

userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)
userRouter.post("/details", jwtMiddleware, UserController.details)

module.exports = userRouter