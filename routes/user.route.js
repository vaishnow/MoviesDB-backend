const express = require("express")
const UserController = require("../controllers/user.controller")
const jwtMiddleware = require("../middlewares/jwt.middleware")

const router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/details",jwtMiddleware, UserController.details)

module.exports = router