const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt") // hash password to be unknown to anyone

//generate an encrypted token to keep logged in user online for x amount of days before destroying the token and logging them out. Also keep registered users logged in too
//takes in unique user id as the payload to verify user I think
function generateToken(id) {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	})
}

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
				response.status(400)
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
				response.status(201).json({
					_id: user.id,
					name: user.name,
					email: user.email,
					token: generateToken(user._id),
				})
			} else {
				response.status(400)
				throw new Error("Invalid User")
			}

			//response.json({message: "Succesfully created new User"})
		} catch (err) {
			console.log(err)
		}
	},
	//Authenticate user
	//POST METHOD
	loginUser: async (request, response) => {
		try {
			const { email, password } = request.body

			const user = await User.findOne({ email })

			if (user && (await bcrypt.compare(password, user.password))) {
				response.json({
					_id: user.id,
					name: user.name,
					email: user.email,
					token: generateToken(user._id),
					authorized: true,
				})
			} else {
				response.status(400) //client error, request will not be completed
				throw new Error("User was not found")
			}
		} catch (err) {
			console.log(err)
		}
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
