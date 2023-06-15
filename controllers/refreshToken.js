const Token = require("../models/Token")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generateTokens")

module.exports = {
	getRefreshToken: async (request, response) => {
		try {
			const refreshToken = request.cookies.refreshToken
			const foundRefreshToken = await Token.findOne({ token: refreshToken })

			if (foundRefreshToken) {
				//prettier-ignore
				const refreshTokenValidated = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
					if(err){
						return response.status(403)
					}

					//Generate a new access token since old one has expired. (This route is only hit once we need a new access token and the refresh token is still valid)
					const accessToken = generateToken(decoded.id)
					
					response.cookie("accessToken", accessToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						sameSite: "strict",
						maxAge: 7 * 24 * 60 * 60 * 1000,
						path: "/",
					})
					response.json({accessToken})
				})
			} else {
				//prettier-ignore
				response.status(403).json({ msg: "Refresh Token Expired, please login again!" })
			}
		} catch (error) {
			console.log(error)
		}
	},
}
