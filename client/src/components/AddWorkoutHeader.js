import styles from "./styles/AddWorkout.module.css"

export function AddWorkoutHeader() {
	const date = new Date()
	let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
	month++

	return (
		<header className={styles.header}>
			<h1>Add Today's Workout</h1>
			<div className={styles.dateDiv}>
				<p>
					{month}/{day}/{year}
				</p>
			</div>
		</header>
	)
}
