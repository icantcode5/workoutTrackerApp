import axios from "axios"
axios.defaults.withCredentials = true

//Get Workouts
const getWorkouts = async (token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	if (process.env.NODE_ENV === "development") {
		const response = await axios.get(
			"http://localhost:5000/workout/viewWorkouts",
			config
		)
		return response.data
	} else {
		const response = await axios.get(
			"https://fitfocus.onrender.com/workout/viewWorkouts",
			config
		)
		return response.data
	}
}

//Create workout
const createWorkout = async (workoutData, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	if (process.env.NODE_ENV === "development") {
		const response = await axios.post(
			"http://localhost:5000/workout/createWorkout",
			workoutData,
			config
		)

		return response.data
	} else {
		const response = await axios.post(
			"https://fitfocus.onrender.com/workout/createWorkout",
			workoutData,
			config
		)

		return response.data
	}
}

//Edit a workout
const editWorkout = async (workoutId, workoutData, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	if (process.env.NODE_ENV === "development") {
		const response = await axios.put(
			`http://localhost:5000/workout/editWorkout/${workoutId}`,
			workoutData,
			config
		)
		return response.data
	} else {
		const response = await axios.put(
			`https://fitfocus.onrender.com/workout/editWorkout/${workoutId}`,
			workoutData,
			config
		)
		return response.data
	}
}

//Delete a workout
const deleteWorkout = async (workoutId, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	if (process.env.NODE_ENV === "development") {
		const response = await axios.delete(
			`http://localhost:5000/workout/deleteWorkout/${workoutId}`,
			config
		)

		return response.data
	} else {
		const response = await axios.delete(
			`https://fitfocus.onrender.com/workout/deleteWorkout/${workoutId}`,
			config
		)

		return response.data
	}
}

//Get Workout(s) by Date
const getWorkoutsByDate = async (date, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	if (process.env.NODE_ENV === "development") {
		const response = await axios.get(
			`http://localhost:5000/workout/getWorkoutsByDate/${date}`,
			config
		)

		return response.data
	} else {
		const response = await axios.get(
			`https://fitfocus.onrender.com/workout/getWorkoutsByDate/${date}`,
			config
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
