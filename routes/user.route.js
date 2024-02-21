const express = require("express")
const {details,login,register} = require("../controllers/user.controller")
const jwtMiddleware = require("../middlewares/jwt.middleware")

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/details", jwtMiddleware, details)

module.exports = userRouter