const User = require("../models/User")
const Workout = require("../models/Workout")

module.exports = {
  getHomePage : async (require, response) =>{
    try{
      response.render("/home")
    }
    catch(err){
      console.log(err)
    }
  },
  createWorkout : async (require, response) => {
    const {title, exercise, sets, reps}  = require.body
    try {
      await Workout.Create({
        title : title,
        exercise : exercise,
        sets : sets,
        reps : reps,
      })
      console.log("Workout has been added!")
    }catch(err){
      console.log(err)
    }
  },
    
}