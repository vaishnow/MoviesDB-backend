const express = require("express")
const jwtMiddleware = require("../middlewares/jwt.middleware")
const { getReview, setReview, delReview } = require("../controllers/mdbReviews.controller")

const mdbReviewsRouter = express.Router()

mdbReviewsRouter.get("/:type/:tmdbId/review",jwtMiddleware, getReview)
mdbReviewsRouter.post("/:type/:tmdbId/review/add", jwtMiddleware, setReview)
mdbReviewsRouter.delete("/:type/:tmdbId/review/del", jwtMiddleware, delReview)

module.exports = mdbReviewsRouter