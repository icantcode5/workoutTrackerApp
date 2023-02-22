import React from "react"
import styles from "./styles/Home.module.css"

export function HomePoints() {
	return (
		<>
			<h2>
				Never forget how much weight you've lifted or how many reps you've
				accomplished. Track it all now.
			</h2>

			<div className={styles.points}>
				<p>Easily Log your workouts, sets and reps</p>
			</div>

			<div className={styles.points}>
				<p>Make any adjustments as you go with updating functionality</p>
			</div>

			<div className={styles.points}>
				<p>
					Keep track of your past workouts for days, months and years to come
				</p>
			</div>
		</>
	)
}
