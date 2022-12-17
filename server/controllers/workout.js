const Workout = require("../models/Workout")
const User = require("../models/User")
const { findById } = require("../models/User")

module.exports = {
  createWorkout : async (request, response) => {
    const {title, exercise, sets, reps}  = request.body
    try {
      const workout = await Workout.create({
        title : title,
        exercise : exercise,
        sets : sets,
        reps : reps,
        user : request.user.id
      })
      console.log("Workout has been added to database")
      response.status(200).json(workout)
    }catch(err){
      console.log(err)
    }
  },
  getWorkouts : async (request,response) => {
    try{
      // {user : request.user.id}
      const workouts = await Workout.find().sort({ created: "desc" }).lean();
      response.json(workouts)
      console.log('Hello, this get method worked!')
    }catch(err){
      console.log(err)
    }
  },
  deleteWorkout : async (request,response) => {
    const { id } = request.params

    try{

      const workout = await Workout.findById(id)
      const user = await User.findById(req.user.id)
      
      // check for user
      if(!user){
        response.status(401)
        throw new Error("User not found")
      }

      //match user id to workout id to check that current user logged in is deleting a workout they created themselves
      if(workout.user.toString() !== user.id){
        response.status(401)
        throw new Error("You are not authorized to delete this workout")
      }

      await Workout.findByIdAndDelete(id)
      console.log("Workout was deleted!")

    }catch(err){
      console.log(err) 
    }
  },
  updateWorkout : async (request, response) => {
    const { id } = request.params
    const {title, exercise, sets, reps } = request.body
    try{
      const workout = Workout.findById(id)
      //Check for User 
      const user = await User.findById(req.user.id)

      //if user isn't found, send 401 code which is an unauthorized code
      if(!user){
        response.status(401) 
        throw new Error("User not found, you are unable to update this workout")
      }

      //Make sure logged in user is the one who is making the update to this single workout by matching user property on the workout object to the user id logged in

      if(workout.user.toString() !== user.id){
        response.status(401)
        throw new Error("You're not the user who created this workout")
      }

      const updatedWorkout = await Workout.findOneAndUpdate(
          {_id : id},
          { 
            title : title,
            exercise : exercise,
            sets : sets,
            reps : reps
          },
          {
            new : true
          }
        )
        response.json(updatedWorkout)
        console.log(request.body)
        console.log("Succesfully updated!")
    }catch(err){
      console.log(err)
      console.log("now this shit isn't working")
    }
  },
  getWorkout : async (request, response) => {
    const { id } = request.params
    try{
      const workout = await Workout.findById({_id : id})
      response.json(workout)
      console.log("sent edit comment page")
    }catch(err){
      console.log(err)
    }
  }
}