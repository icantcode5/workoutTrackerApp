import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./styles/AddWorkout.module.css"

export function QuoteApi() {
	const [quote, setQuote] = useState([])

	useEffect(() => {
		//since we change the code to send the cookies in the header by default, "withCredentials : true" we have to now not send them to the 3rd party API here since it's being blocked because the API is looking for authentication since the credentials are trying to be sent by default.
		axios
			.get("https://type.fit/api/quotes", { withCredentials: false })
			.then((response) =>
				setQuote(response.data[Math.floor(Math.random() * 1600)].text)
			)
	}, [])

	return <p className={styles.quote}>{quote}</p>
}
