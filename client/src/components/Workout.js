import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./styles/ViewWorkouts.module.css"

export function Workout(props) {
	const navigate = useNavigate()

	//Time is returned in UTC (Coordinated Universal Time) so we need to convert it to our local time using "new Date()" constructor and then find the offset between the UTC (given in minutes and we conver it to milliseconds) and our local time and add it to the UTC milliseconds. We create the new local date from the UTC milliseconds time with the offset milliseconds added to give us the local date we want.
	const date = new Date(props.created)
	//offset is retured in minutes
	const offset = date.getTimezoneOffset()
	const local = new Date(date.getTime() + offset * 60000)

	return (
		<>
			<div className={styles.workoutContainer}>
				<h2>Workout: {props.title}</h2>
				<p>
					Date completed: <span>{local.toDateString()}</span>
				</p>
				<p>
					Exercise: <span>{props.exercise}</span>
				</p>
				<p>
					Sets completed: <span>{props.sets}</span>
				</p>
				<p>
					Reps completed: <span>{props.reps}</span>
				</p>
				<p>
					lbs lifted: <span>{props.lbs}</span>
				</p>

				<div className={styles.btnContainer}>
					<button
						className={styles.btn}
						onClick={() => navigate(`/editWorkout/${props.workoutId}`)}
					>
						Edit Workout
					</button>

					<button
						className={styles.btn}
						onClick={() => props.handleDelete(props.workoutId)}
					>
						Delete Workout
					</button>
				</div>
			</div>
		</>
	)
}
