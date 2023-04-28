import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./styles/AddWorkout.module.css"
//import redux state manage.
import { useDispatch } from "react-redux"
import { createWorkout } from "../features/workouts/workoutsSlice"

//In AddWorkout Page, remove react-calendar and add it to view workouts to start implementing a "view workouts by date" feature.
//Look over add workouts css

export function WorkoutForm(props) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { date } = props

	//date helper function
	function formatDate(date) {
		const todaysDate = new Date(date).getDate().toString()
		let month = (new Date(date).getMonth() + 1).toString()
		const year = new Date(date).getFullYear().toString()

		if (month < 10) {
			month = "0" + month
		}
		const formattedDate = year + "-" + month + "-" + todaysDate
		return formattedDate
	}

	const [workout, setWorkout] = useState({
		title: "",
		exercise: "",
		sets: "",
		reps: "",
		lbs: "",
		date: formatDate(date),
	})

	function handleChange(event) {
		const { name, value } = event.target
		setWorkout((prevWorkout) => {
			return {
				...prevWorkout,
				[name]: value,
			}
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(createWorkout(workout))
		navigate("/viewWorkouts")
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<label htmlFor="date">Date</label>
			<input
				id="date"
				required
				type="date"
				name="date"
				value={workout.date}
				onChange={handleChange}
			/>
			<label htmlFor="workout">Body-Part</label>
			<input
				id="workout"
				type="text"
				name="title"
				onChange={handleChange}
				value={workout.title}
				autoComplete="off"
				required
			/>

			<label htmlFor="exercise">Exercise</label>
			<input
				id="exercise"
				type="text"
				name="exercise"
				value={workout.exercise}
				onChange={handleChange}
				autoComplete="off"
				required
			/>
			<label htmlFor="sets"># of Sets</label>
			<input
				required
				id="sets"
				type="telephone"
				name="sets"
				value={workout.sets}
				onChange={handleChange}
				autoComplete="off"
			/>

			<label htmlFor="reps"># of Reps</label>
			<input
				required
				id="reps"
				type="telephone"
				name="reps"
				value={workout.reps}
				onChange={handleChange}
				autoComplete="off"
			/>
			<label htmlFor="lbs">lbs</label>
			<input
				required
				id="lbs"
				type="telephone"
				name="lbs"
				value={workout.lbs}
				onChange={handleChange}
				autoComplete="off"
			/>

			<button>Add Workout +</button>
		</form>
	)
}
