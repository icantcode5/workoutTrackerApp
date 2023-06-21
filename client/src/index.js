import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { store } from "./app/store"
import { Provider } from "react-redux"
// RTQ Implementation
import { ApiProvider } from "@reduxjs/toolkit/query/react"
import { apiSlice } from "./features/workouts/workoutsSlice"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<>
		<Provider store={store}>
			{/* <ApiProvider api={apiSlice}> */}
			<BrowserRouter>
				<App />
			</BrowserRouter>
			{/* </ApiProvider> */}
		</Provider>
	</>
)
