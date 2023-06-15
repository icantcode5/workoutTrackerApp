import styles from "./styles/AddWorkout.module.css"

export function AddWorkoutHeader(props) {
	const options = {
		weekday: "long",
		month: "short",
		year: "numeric",
		day: "numeric",
	}
	const date = new Date().toLocaleDateString("en-us", options)
	return (
		<header className={styles.header}>
			<h1>Add Today's Workout</h1>
			<div className={styles.dateDiv}>
				<p>{date}</p>
			</div>
		</header>
	)
}
