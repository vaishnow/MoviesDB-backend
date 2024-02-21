const mongoose = require("mongoose")

const ratingValidation = {
	type: Number,
	min: [0, "Rating must not be less than 0"],
	max: [10, "Rating must not be greater than 10"]
}

const mdbReview = new mongoose.Schema({
	tmdbId: {
		type: Number,
		required: true,
		max: [10, "tmdbId must be less than 10 numbers in length"]
	},
	type: {
		type: Number,
		required: true,
		enum: {
			values: [1, 2],
			message: "Values for type must be 1(Movie) or 2(TVShow)"
		}
	},
	userId: {
		type: String,
		required: true
	},
	rating: mongoose.Schema({
		plot: ratingValidation,
		visuals: ratingValidation,
		sound: ratingValidation,
		characters: ratingValidation,
		overall: {
			type: Number,
			required: true,
			min: [1, "Overall rating must not be less than 1"],
			max: [10, "Overall rating must not be greater than 10"]
		}

	}),
	review: {
		type: String,
		min: [20, "Review must contain more than 20 characters"],
		max: [350, "Review must not contain more than 350 characters"]
	}

}, {
	timestamps: true
})

module.exports = mongoose.model("mdbreviews", mdbReview)