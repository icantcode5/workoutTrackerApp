const mongoose = require('mongoose')

const WorkoutSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  }, 
  exercise : {
    type : String,
    required : true
  },
  sets : {
    type : Number,
    required : true
  },
  reps : {
    type : Number,
    required : true
  }, 
  created : {
    type : Date,
    default : Date.now
  }
})

// userWorkout: {
//   type : mongoose.Schema.Types.ObjectId,
//   ref : 'User'
// },

module.exports = mongoose.model('Workout', WorkoutSchema)