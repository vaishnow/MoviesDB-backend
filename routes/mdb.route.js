const express = require("express")

const mdbRouter = express.Router()

mdbRouter.post("/:type/:tmdbId/like")
mdbRouter.post("/:type/:tmdbId/save")
mdbRouter.get("/:type/:tmdbId")

module.exports = mdbRouter