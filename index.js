const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.route")

require("dotenv").config()

const app = express()
const PORT = 4000 || process.env.PORT
const connString = process.env.MOVIESDB_URI

app.use(cors())
app.use(express.json())
app.use("/user",userRoutes)

app.get('/', (req, res) => {
	res.send(`<h1 style="text-align:center;margin-top:45vh">MDB running successfully and ready to accept client request</h1>`)
})

app.get('*', (req, res) => {
	res.status(400).send(`<h1 style="text-align:center;margin-top:45vh">404 Not Found</h1>`)
})

mongoose.connect(connString)
	.then(() => {
		app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
		console.log(`Server connected successfully with mongodb`)
	})
	.catch((error) => {
		console.error(`Connection to mongoDB failed: ${error}`)
	})