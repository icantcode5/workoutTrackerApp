import axios from "axios"
axios.defaults.withCredentials = true

//Get Workouts
const getWorkouts = async (accessToken) => {
	if (process.env.NODE_ENV === "development") {
		const response = await axios.get(
			"http://localhost:5000/workout/viewWorkouts"
		)
		return response.data
	} else {
		const response = await axios.get(
			"https://fitfocus.onrender.com/workout/viewWorkouts"
		)
		return response.data
	}
}

//Create workout
const createWorkout = async (workoutData) => {
	if (process.env.NODE_ENV === "development") {
		const response = await axios.post(
			"http://localhost:5000/workout/createWorkout",
			workoutData
		)

		return response.data
	} else {
		const response = await axios.post(
			"https://fitfocus.onrender.com/workout/createWorkout",
			workoutData
		)

		return response.data
	}
}

//Edit a workout
const editWorkout = async (workoutId, workoutData) => {
	if (process.env.NODE_ENV === "development") {
		const response = await axios.put(
			`http://localhost:5000/workout/editWorkout/${workoutId}`,
			workoutData
		)
		return response.data
	} else {
		const response = await axios.put(
			`https://fitfocus.onrender.com/workout/editWorkout/${workoutId}`,
			workoutData
		)
		return response.data
	}
}

//Delete a workout
const deleteWorkout = async (workoutId) => {
	if (process.env.NODE_ENV === "development") {
		const response = await axios.delete(
			`http://localhost:5000/workout/deleteWorkout/${workoutId}`
		)

		return response.data
	} else {
		const response = await axios.delete(
			`https://fitfocus.onrender.com/workout/deleteWorkout/${workoutId}`
		)

		return response.data
	}
}

//Get Workout(s) by Date
const getWorkoutsByDate = async (date) => {
	if (process.env.NODE_ENV === "development") {
		const response = await axios.get(
			`http://localhost:5000/workout/getWorkoutsByDate/${date}`
		)

		return response.data
	} else {
		const response = await axios.get(
			`https://fitfocus.onrender.com/workout/getWorkoutsByDate/${date}`
		)

		return response.data
	}
}

const workoutService = {
	getWorkouts,
	createWorkout,
	editWorkout,
	deleteWorkout,
	getWorkoutsByDate,
}

export default workoutService
