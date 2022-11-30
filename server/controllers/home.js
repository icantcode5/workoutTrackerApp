const User = require("../models/User")
const Workout = require("../models/Workout")

module.exports = {
  getHomePage : async (require, response) =>{
    try{
      const workouts  = await Workout.find({})
      response.json(workouts)
    }
    catch(err){
      console.log(err)
    }
  },
  createWorkout : async (require, response) => {
    const {title, exercise, sets, reps}  = require.body
    try {
      await Workout.create({
        title : title,
        exercise : exercise,
        sets : sets,
        reps : reps,
      })
      console.log("Workout has been added to database")
      //response.redirect("/")
    }catch(err){
      console.log(err)
    }
  },
  getWorkouts : async (require,response) => {
    try{
      const workouts = await Workout.find({})
      response.json(workouts)
      console.log('Hello, this get method worked!')
    }catch(err){
      console.log(err)
    }
  }
}