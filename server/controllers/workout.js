const Workout = require("../models/Workout")

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
      await Workout.findByIdAndDelete({_id : id})
      console.log("Workout was deleted!")
    }catch(err){
      console.log(err) 
    }
  },
  updateWorkout : async (request, response) => {
    const { id } = request.params
    const {title, exercise, sets, reps } = request.body
    try{
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