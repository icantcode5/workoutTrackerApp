const Token = require("../models/Token")
const jwt = require("jsonwebtoken")

module.exports = {
	storeRefreshToken: async (request, response) => {
		try {
			const refreshToken = null
			const verifyRefreshToken = await Token.findOne({ token: refreshToken })

			return response.json({ msg: "verified Token" })
		} catch (error) {
			console.log(error)
		}
	},
}
