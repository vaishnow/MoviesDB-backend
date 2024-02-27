const express = require("express")
const { details, lists, login, register } = require("../controllers/user.controller")
const jwtMiddleware = require("../middlewares/jwt.middleware")

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/details", jwtMiddleware, details)
userRouter.get("/:username/lists/:type", jwtMiddleware, lists)

module.exports = userRouter