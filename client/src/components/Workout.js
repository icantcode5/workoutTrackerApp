import React from "react"
import { useNavigate } from "react-router-dom"
import { StyledButton } from "./styles/Button.styled"
import { StyledDiv } from "./styles/Div.styled"
export function Workout(props) {
	const navigate = useNavigate()

	return (
		<StyledDiv>
			<h2>Workout : {props.title}</h2>
			<p>Date completed : {new Date(props.created).toDateString()}</p>
			<p>Exercise : {props.exercise}</p>
			<p>Sets completed: {props.sets}</p>
			<p>Reps completed: {props.reps}</p>
			<div>
				<StyledButton
					color="limegreen"
					onClick={() => navigate(`/editWorkout/${props.workoutId}`)}>
					Edit Workout
				</StyledButton>
				<StyledButton
					color="red"
					onClick={() => props.handleDelete(props.workoutId)}>
					Delete Workout
				</StyledButton>
			</div>
		</StyledDiv>
	)
}
