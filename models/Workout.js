const mongoose = require("mongoose")

const WorkoutSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	exercise: {
		type: String,
		required: true,
	},
	sets: {
		type: Number,
		required: true,
	},
	reps: {
		type: Number,
		required: true,
	},
	lbs: {
		type: Number,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
})

module.exports = mongoose.model("Workout", WorkoutSchema)
