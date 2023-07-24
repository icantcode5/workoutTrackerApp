const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = {
	protect: async (request, response, next) => {
		//The problem was that axios wasn't sending the cookies header we had set by the server on our requests after logging in so we had to directly set the axios default to include the cookies in every request which now allows us to grab the jwt token value we set in the cookie header (added "withCredentials" to axios.defaults). We also had to set our cors middleware to "{origin: "the domain the request is coming from", credentials : true}". cookie-parser middleware dep. allows us to read the "request.cookies" object
		const refreshTokenCookie = request.cookies.refreshToken
		//convention is to send token with the word "Bearer" before it to identify the type of authorization we are sending
		if (request.header("Authorization") && refreshTokenCookie) {
			try {
				const accessToken = request.header("Authorization").split(" ")[1]
				console.log(accessToken)
				// console.log(accessToken)
				//Verify jwt token in cookie headers
				//prettier-ignore
				const decodedRefreshToken = jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN_SECRET) //MIGHT NOT NEED THIS
				//prettier-ignore
				const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET)

				//prettier-ignore
				request.user = await User.findById(decodedAccessToken.id).select("-password")
				next()
			} catch (err) {
				// console.log(err.message)
				response.status(403).json({ error: err.message })
				// throw new Error("Not Authorized!")  //THIS LINE OF CODE STOPS THE SERVER FROM RUNNING WHICH IS NOT WHAT WE WANT WHEN WE WANT TO GET A NEW REFRESH TOKEN AFTER AN EXPIRED ONE COMES THROUGH THE MIDDLEWARE

				//ALL THAT'S LEFT TO DO IS MAKE SURE THE REFRESH TOKEN API PROVIDES A NEW ACCESS TOKEN BEFORE WE RETRY THE GETWORKOUTS API AGAIN!
				//BASED ON NETWORK TAB IN DEV TOOLS, THE GETWORKOUTS API FAILS ONCE THE CURRENT ACCESS TOKEN EXPIRES AND THE REFRESHTOKEN API IS CALLED WHICH CREATES A NEW ACCESS TOKEN AND IS SET IN OUR REDUX STATE. THE QUESTION NOW IS WHY DOES THE GETWORKOUT API FAIL AFTER IT HAS THE NEW ACCESS TOKEN? ACTUALLY THE REDUX DEV TOOL DOESN'T SHOW THE REFRESHTOKEN API HIT NOR THE STATE UPDATED? WEIRD
			}
		}

		if (!request.header("Authorization") && !refreshTokenCookie) {
			response.status(400).send("No cookie found, not Authorized")
			throw new Error("No cookie found, Not Authorized")
		}
	},
}
