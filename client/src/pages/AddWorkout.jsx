import React, { useState } from "react"
import { AddWorkoutHeader } from "../components/AddWorkoutHeader.js"
import { QuoteApi } from "../components/QuoteApi"
import { WorkoutForm } from "../components/WorkoutForm"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import styles from "../components/styles/AddWorkout.module.css"

export function AddWorkout() {
	const [date, setDate] = useState(new Date())

	const onChange = (date) => {
		setDate(date)
		console.log(date.toString())
	}

	return (
		<>
			<AddWorkoutHeader />
			<QuoteApi />
			{/* <div className={styles.formandcalendar}> */}
			<WorkoutForm date={date} />
			{/* <div>
					<Calendar onChange={onChange} value={date} />
				</div> */}
			{/* </div> */}
		</>
	)
}
