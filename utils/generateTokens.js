const jwt = require("jsonwebtoken")

module.exports = {
	//Access Token
	generateToken: (id) => {
		return jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: "1hr",
		})
	},

	//Refresh Token
	generateRefreshToken: (id) => {
		return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: "1hr",
		})
	},
}
