import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import workoutsReducer from "../features/workouts/workoutsSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		workouts: workoutsReducer,
	},
})
