const multer = require('multer')

const getFolderName = (fieldName) => {
	if (fieldName === "profileimg" || fieldName === "profile" || fieldName === "userimg") return "profile"
	throw Error("Bad Request")
}

const storage = multer.diskStorage({
	destination: (req, file, callback) => callback(null, `uploads/${getFolderName(file.fieldname)}`),
	filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`)
})

const fileFilter = (req, file, callback) => {
	const fileSize = parseInt(req.headers["content-length"])
	const maxFileSize = 2 * 1024 * 1024
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
		if (fileSize < (2 * 1024 * 1024)) {
			callback(null, true)
		} else {
			return callback(new Error(`max filesize cannot exceed ${maxFileSize} bytes`), false)
		}
	} else {
		return callback(new Error("only png,jpg,jpeg files are allowed"), false)
	}
}

const multercfg = multer({ storage, fileFilter })

module.exports = multercfg