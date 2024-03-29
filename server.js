const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo") //(session); no longer need this in the new version of MongoStore
const connectDB = require("./config/database")
//const mainRoutes = require("./routes/main");
const workoutRoutes = require("./routes/workout")
const userRoutes = require("./routes/user")
const refreshTokenRoutes = require("./routes/refreshToken")
const path = require("path")
const cookieParser = require("cookie-parser")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" })

//Connect To Database
connectDB()

//Static Folder
if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"))
}

//Body Parsing, data in body is sent as a string so we need to parse it to json
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//prettier-ignore
app.use(cors({credentials: true, origin: "http://localhost:3000",}))

// Setup Sessions - stored in MongoDB
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		//store property has been updated and can be found in docs
		store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
	})
)

//Setup Routes For Which The Server Is Listening
app.use("/users", userRoutes)
app.use("/workout", workoutRoutes)
app.use("/api/refreshToken", refreshTokenRoutes)

if (process.env.NODE_ENV === "production") {
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "./client/build/index.html"))
	})
}

//Server Running
app.listen(process.env.PORT, () => {
	console.log("Server is running")
})
