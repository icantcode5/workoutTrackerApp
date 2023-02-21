import styles from "../components/styles/Spinner.module.css"

export default function Spinner() {
	return (
		<div className={styles.loadingSpinnerContainer}>
			<div className={styles.loadingSpinner}></div>
		</div>
	)
}
