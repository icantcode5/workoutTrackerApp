const User = require("../models/User")
const Workout = require("../models/Workout")

module.exports = {
  getHomePage : async (request, response) =>{
    try{
      response.json("Hello, Welcome to the Home Page where the login page is going to be")
    }
    catch(err){
      console.log(err)
    }
  },
}