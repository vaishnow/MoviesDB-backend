const express = require("express")
const jwtMiddleware = require("../middlewares/jwt.middleware")
const MDBController = require("../controllers/mdb.controller")

const mdbRouter = express.Router()

mdbRouter.post("/:type/:tmdbId/like", jwtMiddleware, MDBController.like)
mdbRouter.post("/:type/:tmdbId/save", jwtMiddleware, MDBController.save)
mdbRouter.get("/:type/:tmdbId", jwtMiddleware, MDBController.getStats)

module.exports = mdbRouter