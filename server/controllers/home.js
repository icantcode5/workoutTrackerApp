const User = require("../models/User")
const Workout = require("../models/Workout")

module.exports = {
  getHomePage : async (request, response) =>{
    try{
      const workouts  = await Workout.find({})
      response.json(workouts)
    }
    catch(err){
      console.log(err)
    }
  },
  createWorkout : async (request, response) => {
    const {title, exercise, sets, reps}  = request.body
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
  getWorkouts : async (request,response) => {
    try{
      const workouts = await Workout.find({}).sort({ created: "desc" }).lean();
      response.json(workouts)
      console.log('Hello, this get method worked!')
    }catch(err){
      console.log(err)
    }
  },
  deleteWorkout : async (request,response) => {
    const { id } = request.params
    try{
      await Workout.findByIdAndDelete({_id : id})
      console.log("Workout was deleted!")
    }catch(err){
      console.log(err) 
    }
  },
  updateWorkout : async (request, response) => {

  }
}