const MDB = require("../models/mdb.model")

exports.like = async (req, res) => {
	const { tmdbId } = req.params
	const type = req.params.type == "movie" ? 1 : 2
	const { liked } = req.body
	const userId = req.payload

	try {
		if (!tmdbId || typeof (liked) != "boolean" || !userId) {
			res.status(400).json({ message: "Bad Request" })
		}

		const result = await MDB.findOneAndUpdate({ type, userId, tmdbId }, { liked }, { upsert: true, new: true })
		if (result) {
			res.status(200).json({
				message: result.liked ? 'Added to liked list' : 'Removed from liked list',
				liked: result.liked
			});
		}
		else {
			res.status(406).json({ message: "Something went wrong" });
		}
	} catch (error) {
		res.status(401).json({ error });
	}
}

exports.save = async (req, res) => {
	const { tmdbId } = req.params
	const type = req.params.type == "movie" ? 1 : 2
	const { saved } = req.body
	const userId = req.payload

	try {
		if (!tmdbId || typeof (saved) != "boolean" || !userId) {
			res.status(400).json({ message: "Bad Request" })
		}

		const result = await MDB.findOneAndUpdate({ type, userId, tmdbId }, { saved }, { upsert: true, new: true })
		if (result) {
			res.status(200).json({
				message: result.saved ? 'Saved to Watch later' : 'Removed from Watch later',
				saved: result.saved
			});
		}
		else {
			res.status(406).json({ message: "Something went wrong" });
		}
	} catch (error) {
		res.status(401).json({ error });
	}
}

exports.getStats = async (req, res) => {
	const { tmdbId } = req.params
	const type = req.params.type == "movie" ? 1 : 2
	const userId = req.payload

	try {
		if (!tmdbId || !userId) {
			res.status(400).json({ message: "Bad Request" })
		}

		const result = await MDB.findOneAndUpdate({ type, userId, tmdbId }, { viewedAt: new Date().toISOString() }, { upsert: true, new: true, projection: { _id: 0, userId: 0, __v: 0 } })
		if (result) {
			res.status(200).json({
				message: "Success",
				stats: result
			});
		}
		else {
			res.status(406).json({ message: "Something went wrong" });
		}
	} catch (error) {
		res.status(401).json({ error });
	}
}