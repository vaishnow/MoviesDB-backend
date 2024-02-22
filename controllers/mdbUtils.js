const getContentTypeIdentifier = (contentType) => {
	if (contentType == "movie") return 1
	if (contentType == "tv") return 2
	res.status(400).json({ message: "Bad Request" });
	return null
}

module.exports = { getContentTypeIdentifier }