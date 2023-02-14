import React, { useEffect } from "react"
import { useState } from "react"
import { StyledForm } from "./styles/Form.styled"
import { useNavigate } from "react-router-dom"

//import redux state manage.
import { useDispatch, useSelector } from "react-redux"
import { createWorkout } from "../features/workouts/workoutsSlice"

export function Form() {
	//removed the state props being passed down from parent component
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { workouts, isLoading, isSuccess, isError, message } = useSelector(
		(state) => {
			return state.workouts
		}
	)

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
		dispatch(createWorkout(workout))
	}

	useEffect(() => {
		if (isSuccess) {
			navigate("/viewWorkouts")
		}

		if (isError) {
			console.log(message)
		}
	}, [navigate, isSuccess, isError, message])

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
