const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = {
  protect : async (request, response, next) => {
    let token

    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
      try{
      //GET token from header
      console.log(token)
      token = request.headers.authorization.split(' ')[1]

      //Verify token 
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //Get user from the token
      //we are finding the user by what's in the token which we set up the generateToken function to take in the unique user id (could set it up to take in the user name or anything else. We can grab this in the "decoded" object)
      //we don't want the password from the token function so we use the method select() and pass in the password in a string
      
      //request.user now holds the unique id from the logged in user so we can use it in our REST API endpoint to select the curretly logged in User's unique id
      request.user = await User.findById(decoded.id).select("-password")

      next()
      }catch(err){
        console.log(err)
        response.status(401)
        throw new Error("Not Authorized!")
      }
    }

    if(!token){
      response.status(400)
      throw new Error("Token wasn't found")
    }
  }
}

