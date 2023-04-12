const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = {
	protect: async (request, response, next) => {
		let token
		//convention is to send token with the word "Bearer" before it to identify the type of authorization we are sending
		if (
			request.headers.authorization &&
			request.headers.authorization.startsWith("Bearer")
		) {
			try {
				//Get token from the header.authorization property which is sent along with the request if a user is logged in
				token = request.headers.authorization.split(" ")[1]
				//Verify token
				const decoded = jwt.verify(token, process.env.JWT_SECRET)
				console.log(decoded)

				//Get user from the token bc we signed the token with the user who logged
				//we are finding the user by what's in the token which we set up the generateToken function to take in the unique user id (could set it up to take in the user name or anything else. We can grab this in the "decoded" object)
				//we don't want the password from the token function so we use the method .select() and pass in the password in a string

				//request.user now holds the logged in user's information so we can use it in our REST API endpoint to select the currently logged in User's unique id, and other properties
				request.user = await User.findById(decoded.id).select("-password")

				next()
			} catch (err) {
				console.log(err)
				response.status(401).send("Not Authorized")
				throw new Error("Not Authorized!")
			}
		}

		if (!token) {
			console.log(request.headers.authorization)
			response.status(400).send("No token found, not Authorized")
			throw new Error("No Token found, Not Authorized")
		}
	},
}
