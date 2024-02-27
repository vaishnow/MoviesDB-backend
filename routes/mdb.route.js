const express = require("express")
const jwtMiddleware = require("../middlewares/jwt.middleware")
const { getStats, like, save } = require("../controllers/mdb.controller")

const mdbRouter = express.Router()

mdbRouter.post("/:type/:tmdbId/like", jwtMiddleware, like)
mdbRouter.post("/:type/:tmdbId/save", jwtMiddleware, save)
mdbRouter.post("/:type/:tmdbId", jwtMiddleware, getStats)

module.exports = mdbRouter