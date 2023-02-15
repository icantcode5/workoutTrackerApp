import axios from "axios"

//Get Workouts
const getWorkouts = async (token) => {
	const config = {
		headers: {
			authorization: token,
		},
	}

	const response = await axios.get(
		"http://localhost:5000/workout/viewWorkouts",
		config
	)
	return response.data
}

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

//Edit a workout
const editWorkout = async (workoutId, workoutData, token) => {
	const config = {
		headers: {
			authorization: token,
		},
	}

	const response = await axios.put(
		`http://localhost:5000/workout/editWorkout/${workoutId}`,
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
	getWorkouts,
	createWorkout,
	editWorkout,
	deleteWorkout,
}

export default workoutService
