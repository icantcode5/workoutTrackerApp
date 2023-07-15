const User = require("../models/User")
const Token = require("../models/Token")
const bcrypt = require("bcrypt") // hash password to be unknown to anyone
//prettier-ignore
const { generateToken, generateRefreshToken } = require("../utils/generateTokens")

module.exports = {
	//register new user
	//POST METHOD
	registerUser: async (request, response) => {
		try {
			//might need password2 variable here too unless we only need to check for it in the front end
			const { name, email, password } = request.body

			if (!name || !email || !password) {
				response.status(400)
				throw new Error("Make sure all fields are filled out!")
			}

			//Check if user exists

			const userExists = await User.findOne({ email })

			if (userExists) {
				response.status(400).send("Email already exists")
				throw new Error("User already exists, Please Login")
			}

			//hash password
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt)

			//create user

			const user = await User.create({
				name: name,
				email: email,
				password: hashedPassword,
			})

			//once the user is created, we are sending the user's info (document) back as the response to the frontend which we'll need to store the token in local storage to be able to make protected requests
			if (user) {
				//Once User is created, create http header cookie token
				//maxAge is the amount of the time the token will be recongized by browser (expired or not)
				// When we create the token and sign it, expiresIn property determines how much time the token is valid for authorization.
				response.cookie("accessToken", generateToken(user._id), {
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					sameSite: "strict",
					maxAge: 7 * 24 * 60 * 60 * 1000,
					path: "/",
				})

				response.status(201).json({
					_id: user.id,
					name: user.name,
					email: user.email,
				})
			} else {
				response.status(400).send("Invalid User, Please try again")
				throw new Error("Invalid User")
			}
		} catch (err) {
			console.log(err)
		}
	},

	//Login/Authenticate user
	//POST METHOD
	loginUser: async (request, response) => {
		try {
			const { email, password } = request.body

			const user = await User.findOne({ email })

			if (user && (await bcrypt.compare(password, user.password))) {
				const refreshToken = generateRefreshToken(user._id)
				const accessToken = generateToken(user._id)
				const addRefreshTokentoDB = await Token.create({
					userId: user._id,
					token: refreshToken,
				})
				//ignore-prettier
				//We can add as many "Set-Cookie" to the response header by chaining mulitiple ".cookie()" to the response.
				response
					.cookie("accessToken", accessToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						sameSite: "strict",
						maxAge: 7 * 24 * 60 * 60 * 1000,
						path: "/",
					})
					.cookie("refreshToken", refreshToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						sameSite: "strict",
						maxAge: 7 * 24 * 60 * 60 * 1000,
						path: "/",
					})

				response.json({
					_id: user.id,
					name: user.name,
					email: user.email,
					authorized: true,
					accessToken,
				})
			} else {
				response
					.status(400)
					.send("Please make sure email and password are correct") //client error, request will not be completed
				throw new Error("User Not Found")
			}
		} catch (err) {
			response.status(400)
			console.log(err)
		}
	},

	//Logout User
	//POST METHOD
	//Remove refreshToken from DB
	logoutUser: async (request, response) => {
		try {
			const refreshToken = request.cookies.refreshToken
			//prettier-ignore
			const deleteRefreshTokenFromDB = await Token.deleteOne({token : refreshToken})

			response
				.clearCookie("refreshToken", {
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					sameSite: "strict",
					maxAge: 7 * 24 * 60 * 60 * 1000,
					path: "/",
				})
				.clearCookie("accessToken", {
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					sameSite: "strict",
					maxAge: 7 * 24 * 60 * 60 * 1000,
					path: "/",
				})
			response.status(200).json({ message: "user logged out" })
		} catch (error) {}
	},

	//Get user data
	//GET REGISTER
	//Private access
	getUser: async (request, response) => {
		try {
			const { _id, name, email } = await User.findById(request.user.id)
			response.status(200).json({
				id: _id,
				name: name,
				email: email,
			})
		} catch (err) {
			console.log(err)
		}
	},
}
