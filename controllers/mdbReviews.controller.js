const mongoose = require("mongoose")
const mdbReview = require("../models/mdbReviews.model")
const { getContentTypeIdentifier } = require("./mdbUtils")

exports.getReview = async (req, res) => {
	const tmdbId = parseInt(req.params.tmdbId)
	const userId = req.payload ? req.payload : null
	const type = getContentTypeIdentifier(req.params.type)
	let reviewed = false

	try {
		if (!tmdbId || !type) res.status(400).json({ message: "Bad Request" })

		let reviews = await mdbReview.aggregate([{ $match: { type, tmdbId } }, {
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user"
			}
		}])

		if (userId) {
			reviews = reviews.sort((a, b) => {
				if (a.userId == userId) return -1
				if (b.userId == userId) return 1
			})
		}

		if (reviews.length > 0 && reviews[0].userId == userId) reviewed = true

		if (reviews) {
			res.status(200).send({
				message: "Success",
				reviews,
				reviewed
			})
		}
		else {
			res.status(406).send({
				message: "No reviews were found"
			})
		}
	} catch (error) {
		res.status(401).json({
			error: error.name,
			message: error.message
		});
	}
}

exports.setReview = async (req, res) => {
	const userId = req.payload
	const { tmdbId } = req.params
	const { review, plot, visuals, sound, characters, overall } = req.body
	const type = getContentTypeIdentifier(req.params.type)

	const rating = {
		plot,
		visuals,
		sound,
		characters,
		overall,
	}

	try {
		if (!tmdbId || !type || !userId) {
			res.status(400).json({ message: "Bad Request" })
		}

		const result = await mdbReview.findOneAndUpdate({ type, tmdbId, userId }, { review, rating }, { upsert: true, new: true })
		if (result) {
			res.status(200).json({
				message: "Review Added",
				result: req.body
			});
		}
		else {
			res.status(406).json({ message: "Something went wrong" });
		}
	} catch (error) {
		res.status(401).json({
			error: error.name,
			message: error.message
		});
	}
}

exports.delReview = async (req, res) => {
	const userId = req.payload
	const { tmdbId } = req.params
	const type = getContentTypeIdentifier(req.params.type)

	try {
		if (!tmdbId || !type || !userId) {
			res.status(400).json({ message: "Bad Request" })
		}

		const result = await mdbReview.findOneAndDelete({ type, tmdbId, userId })
		if (result) {
			res.status(200).json({
				message: "Review removed",
				result: req.body
			});
		}
		else {
			res.status(406).json({ message: "Something went wrong" });
		}
	} catch (error) {
		res.status(401).json({
			error: error.name,
			message: error.message
		});
	}
}