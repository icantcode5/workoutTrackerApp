import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./styles/AddWorkout.module.css"

export function QuoteApi() {
	const [quote, setQuote] = useState([])

	useEffect(() => {
		//since we change the code to send the cookies in the header by default, "withCredentials : true" we have to now not send them to the 3rd party API here since it's being blocked because the API is looking for authentication since the credentials are trying to be sent by default.
		async function fitnessQuote() {
			const quote = await axios.get("https://type.fit/api/quotes", {
				withCredentials: false,
			})

			setQuote(quote.data[Math.floor(Math.random() * 16)].text) //api changed to 16 quotes instead of 1600....
		}

		fitnessQuote()
	}, [])

	return <p className={styles.quote}>{quote}</p>
}
