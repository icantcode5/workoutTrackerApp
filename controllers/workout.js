const Workout = require("../models/Workout")
const User = require("../models/User")

module.exports = {
	createWorkout: async (request, response) => {
		const { title, exercise, sets, reps } = request.body
		try {
			const workout = await Workout.create({
				title: title,
				exercise: exercise,
				sets: sets,
				reps: reps,
				user: request.user.id,
			})
			console.log("Workout has been added to database")
			response.status(200).json(workout)
		} catch (err) {
			console.log(err)
		}
	},
	getWorkouts: async (request, response) => {
		try {
			//since the routes are protected, we are able to use the user's unique id decoded from the token upon any request made while logged in

			//grab only the workouts made by logged in user with their unique id (user's id is attached to the Workout schema)
			const workouts = await Workout.find({ user: request.user.id })
				.sort({ created: "desc" })
				.lean()

			//send the workouts found in response as an array of objects
			response.json(workouts)

			console.log("Hello, this get method worked!")
		} catch (err) {
			console.log(err)
		}
	},
	deleteWorkout: async (request, response) => {
		const { id } = request.params

		try {
			const workout = await Workout.findById(id)
			const user = await User.findById(request.user.id)

			// check for user
			if (!user) {
				response.status(401)
				throw new Error("User not found")
			}

			//match user id to workout user id to check that current user logged in is deleting a workout they created themselves
			if (workout.user.toString() !== user.id) {
				response.status(401)
				throw new Error("You are not authorized to delete this workout")
			}

			await Workout.findByIdAndDelete(id)
			console.log("Workout was deleted!")
			response.status(200).json(workout)
		} catch (err) {
			console.log(err)
		}
	},
	updateWorkout: async (request, response) => {
		const { id } = request.params
		const { title, exercise, sets, reps } = request.body
		try {
			//find single workout based on workout unique id grabbed from the URL parameter
			const workout = await Workout.findById(id)

			//Check for User
			const user = await User.findById(request.user.id)

			//if user isn't found, send 401 code which is an unauthorized code
			if (!user) {
				response.status(401)
				throw new Error("User not found, you are unable to update this workout")
			}

			//Make sure logged in user is the one who is making the update to this single workout by matching user property on the workout document to the user id logged in

			//we have to convert the user's id on the workout to a string because it's given as objectId, but if we are referencing a documents own _id, we can us (object.id) to return the objectId as a string.
			if (workout.user.toString() !== user.id) {
				response.status(401)
				throw new Error("You're not the user who created this workout")
			}

			const updatedWorkout = await Workout.findOneAndUpdate(
				{ _id: id },
				{
					title: title,
					exercise: exercise,
					sets: sets,
					reps: reps,
				},
				{
					new: true,
				}
			)
			response.json(updatedWorkout)
			console.log("Succesfully updated!")
		} catch (err) {
			console.log(err)
		}
	},
	getWorkout: async (request, response) => {
		try {
			//grab unique id from the ULR parameter
			const { id } = request.params

			//find single workout with id of current workout being looked at
			const workout = await Workout.findById({ _id: id })

			response.json(workout)
			console.log("sent edit comment page")
		} catch (err) {
			console.log(err)
		}
	},
}
