import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./styles/AddWorkout.module.css"

export function QuoteApi() {
	const [quote, setQuote] = useState([])

	useEffect(() => {
		axios
			.get("https://type.fit/api/quotes")
			.then((response) =>
				setQuote(response.data[Math.floor(Math.random() * 1600)].text)
			)
	}, [])

	return <p className={styles.quote}>{quote}</p>
}
