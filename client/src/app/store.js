import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import workoutsReducer, { apiSlice } from "../features/workouts/workoutsSlice"

//RTQ Import

export const store = configureStore({
	reducer: {
		auth: authReducer,
		workouts: workoutsReducer,
	},
})
