import styles from "./styles/AddWorkout.module.css"

export function AddWorkoutHeader(props) {
	return (
		<header className={styles.header}>
			<h1>Add Today's Workout</h1>
			<div className={styles.dateDiv}>
				<p>{props.date}</p>
			</div>
		</header>
	)
}
