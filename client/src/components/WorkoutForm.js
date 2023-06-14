import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./styles/AddWorkout.module.css"
//import redux state manage.
import { useDispatch } from "react-redux"
import { createWorkout } from "../features/workouts/workoutsSlice"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

//In AddWorkout Page, remove react-calendar and add it to view workouts to start implementing a "view workouts by date" feature.
//Look over add workouts css

export function WorkoutForm(props) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { date } = props

	//use yup library for form validation by creating a schema
	const workoutDataSchema = yup.object().shape({
		date: yup.string().required(),
		title: yup.string().required(),
		exercise: yup.string().required(),
		sets: yup.number().positive().min(1).required(),
		reps: yup.number().positive().min(1).required(),
		lbs: yup.number().positive().min(1).required(),
	})

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(workoutDataSchema),
	})

	//date helper function that formats date as "#-#-###"
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

	const formSubmit = (data, event) => {
		// event.preventDefault() maybe react-hook-form takes care of this?
		console.log(data)
		// dispatch(createWorkout(workout))
		// navigate("/viewWorkouts")
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
			<label htmlFor="date">Date</label>
			<input
				id="date"
				required
				type="date"
				name="date"
				// value={workout.date} //delete after setting up react-hook-form?
				onChange={handleChange} //delete after setting up react-hook-form?
				{...register("date")}
			/>
			<label htmlFor="workout">Body-Part</label>
			<input
				id="workout"
				type="text"
				name="title"
				onChange={handleChange}
				// value={workout.title}
				autoComplete="off"
				required
				{...register("title")}
			/>

			<label htmlFor="exercise">Exercise</label>
			<input
				id="exercise"
				type="text"
				name="exercise"
				// value={workout.exercise}
				onChange={handleChange}
				autoComplete="off"
				required
				{...register("exercise")}
			/>
			<label htmlFor="sets"># of Sets</label>
			<input
				required
				id="sets"
				type="telephone"
				name="sets"
				// value={workout.sets}
				onChange={handleChange}
				autoComplete="off"
				{...register("sets")}
			/>

			<label htmlFor="reps"># of Reps</label>
			<input
				required
				id="reps"
				type="telephone"
				name="reps"
				// value={workout.reps}
				onChange={handleChange}
				autoComplete="off"
				{...register("reps")}
			/>
			<label htmlFor="lbs">lbs</label>
			<input
				required
				id="lbs"
				type="telephone"
				name="lbs"
				// value={workout.lbs}
				onChange={handleChange}
				autoComplete="off"
				{...register("lbs")}
			/>

			<button>Add Workout +</button>
		</form>
	)
}
