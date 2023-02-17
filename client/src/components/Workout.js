import React from "react"
import { useNavigate } from "react-router-dom"
import { StyledButton } from "./styles/Button.styled"
import { StyledDiv } from "./styles/Div.styled"
import styles from "./styles/Workout.module.css"

export function Workout(props) {
	const navigate = useNavigate()

	return (
		<div className={styles.workoutContainer}>
			<h2>Workout : {props.title}</h2>
			<p>
				Date completed : <span>{new Date(props.created).toDateString()}</span>
			</p>
			<p>
				Exercise : <span>{props.exercise}</span>
			</p>
			<p>
				Sets completed: <span>{props.sets}</span>
			</p>
			<p>
				Reps completed: <span>{props.reps}</span>
			</p>

			<div className={styles.btnContainer}>
				<button
					className={styles.btn}
					onClick={() => navigate(`/editWorkout/${props.workoutId}`)}>
					Edit Workout
				</button>

				<button
					className={styles.btn}
					onClick={() => props.handleDelete(props.workoutId)}>
					Delete Workout
				</button>
			</div>
		</div>
	)
}
