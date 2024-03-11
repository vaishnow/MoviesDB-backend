const express = require("express")
const jwtMiddleware = require("../middlewares/jwt.middleware")
const multercfg = require("../middlewares/multer.middleware")
const { details, lists, login, register, edit } = require("../controllers/user.controller")

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/details", jwtMiddleware, details)
userRouter.post("/edit", jwtMiddleware, multercfg.single("profileimg"), edit)
userRouter.get("/:username/lists/:type", jwtMiddleware, lists)

module.exports = userRouter