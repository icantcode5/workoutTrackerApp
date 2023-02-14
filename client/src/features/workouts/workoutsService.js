import axios from "axios"

//create workout
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

const workoutService = {
	createWorkout,
}

export default workoutService
