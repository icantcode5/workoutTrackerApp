import axios from "axios"

//Create workout
const createWorkout = async (workoutData, token) => {
	const config = {
		headers: {
			authorization: token,
		},
	}

	const response = await axios.post(
		"http://localhost:5000/workout/createWorkout",
		workoutData,
		config
	)

	return response.data
}

//Delete a workout
const deleteWorkout = async (workoutId, token) => {
	const config = {
		headers: {
			authorization: token,
		},
	}

	const response = await axios.delete(
		`http://localhost:5000/workout/deleteWorkout/${workoutId}`,
		config
	)

	return response.data
}

const workoutService = {
	createWorkout,
	deleteWorkout,
}

export default workoutService
