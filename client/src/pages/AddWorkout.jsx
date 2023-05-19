import React, { useState } from "react"
import { AddWorkoutHeader } from "../components/AddWorkoutHeader.js"
import { QuoteApi } from "../components/QuoteApi"
import { WorkoutForm } from "../components/WorkoutForm"
import styles from "../components/styles/AddWorkout.module.css"

export function AddWorkout(props) {
	return (
		<>
			<AddWorkoutHeader date={props.date} />
			<QuoteApi />
			<WorkoutForm date={props.date} />
		</>
	)
}
