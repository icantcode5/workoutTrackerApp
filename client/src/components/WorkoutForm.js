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
	//prettier-ignore
	const workoutDataSchema = yup.object().shape({
		date: yup.string().required("Select a date"),
		title: yup.string().required("Enter A Body-Part"),
		exercise: yup.string().required("Enter an exercise"),
		sets: yup.number().positive().min(1).required().typeError("Enter a number"),
		reps: yup.number().positive().min(1).required("Enter a number").typeError("Enter a number"),
		lbs: yup.number().positive().min(1).required("Enter a number").typeError("Enter a number"),
	})
	//prettier-ignore
	const {register, handleSubmit, formState: { errors }} = useForm({
		resolver: yupResolver(workoutDataSchema),
	})

	//date helper function that formats date as "#-#-####"
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
		console.log(data)
		console.log(workout)
		dispatch(createWorkout(data))
		navigate("/viewWorkouts")
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
			<label htmlFor="date">Date</label>
			<input
				id="date"
				type="date"
				name="date"
				// value={workout.date} //delete after setting up react-hook-form?
				onChange={handleChange} //delete after setting up react-hook-form?
				{...register("date")}
			/>
			<p>{errors.date?.message}</p>

			<label htmlFor="workout">Body-Part</label>
			<input
				id="workout"
				type="text"
				name="title"
				onChange={handleChange}
				// value={workout.title}
				autoComplete="off"
				// required
				{...register("title")}
			/>
			<p>{errors.title?.message}</p>

			<label htmlFor="exercise">Exercise</label>
			<input
				id="exercise"
				type="text"
				name="exercise"
				// value={workout.exercise}
				onChange={handleChange}
				autoComplete="off"
				{...register("exercise")}
			/>
			<p>{errors.exercise?.message}</p>

			<label htmlFor="sets"># of Sets</label>
			<input
				id="sets"
				type="telephone"
				name="sets"
				// value={workout.sets}
				onChange={handleChange}
				autoComplete="off"
				{...register("sets")}
			/>
			<p>{errors.sets?.message}</p>

			<label htmlFor="reps"># of Reps</label>
			<input
				id="reps"
				type="telephone"
				name="reps"
				// value={workout.reps}
				onChange={handleChange}
				autoComplete="off"
				{...register("reps")}
			/>
			<p>{errors.reps?.message}</p>

			<label htmlFor="lbs">lbs</label>
			<input
				id="lbs"
				type="telephone"
				name="lbs"
				// value={workout.lbs}
				onChange={handleChange}
				autoComplete="off"
				{...register("lbs")}
			/>
			<p>{errors.lbs?.message}</p>

			<button>Add Workout +</button>
		</form>
	)
}
