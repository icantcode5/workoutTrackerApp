import React from "react"
import { useState } from "react"
import { StyledForm } from "./styles/Form.styled"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Form() {
	const navigate = useNavigate()

	const [workout, setWorkout] = useState({
		title: "",
		exercise: "",
		sets: "",
		reps: "",
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
		axios
			.post("http://localhost:5000/workout/createWorkout", workout, {
				headers: {
					authorization: localStorage.getItem("token"),
				},
			})
			.then(() => {
				navigate("/viewWorkouts")
			})
	}

	return (
		<StyledForm onSubmit={handleSubmit}>
			<label htmlFor="workout">Body-Part</label>
			<input
				id="workout"
				type="text"
				name="title"
				onChange={handleChange}
				value={workout.title}
			/>

			<label htmlFor="exercise">Exercise</label>
			<input
				id="exercise"
				type="text"
				name="exercise"
				value={workout.exercise}
				onChange={handleChange}
			/>
			<label htmlFor="sets">Sets</label>
			<input
				id="sets"
				type="number"
				name="sets"
				value={workout.sets}
				onChange={handleChange}
			/>

			<label htmlFor="reps">Reps</label>
			<input
				id="reps"
				type="number"
				name="reps"
				value={workout.reps}
				onChange={handleChange}
			/>
			<button>Store Workout</button>
		</StyledForm>
	)
}
