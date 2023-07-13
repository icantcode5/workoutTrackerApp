import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import workoutsService from "./workoutsService"

const initialState = {
	workouts: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
}

//Get workouts
export const getWorkouts = createAsyncThunk(
	"workouts/getWorkouts",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.userData.token

			return await workoutsService.getWorkouts(token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//Create a new workout
export const createWorkout = createAsyncThunk(
	"workouts/createWorkout",
	async (workoutData, thunkAPI) => {
		try {
			//we are getting the current userState's token which we saved in our "auth's" state. We can also get the token from our localeStorage too!
			const token = thunkAPI.getState().auth.userData.token
			// console.log(thunkAPI.getState())
			return await workoutsService.createWorkout(workoutData, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//Edit a workout
export const editWorkout = createAsyncThunk(
	"workouts/editWorkout",
	async ([...rest], thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.userData.token
			// console.log(thunkAPI.getState().auth)
			const [workoutId, workoutData] = rest

			return await workoutsService.editWorkout(workoutId, workoutData, token)
		} catch (error) {
			console.log(error)
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//Delete a workout
export const deleteWorkout = createAsyncThunk(
	"workouts/delete",
	async (workoutId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.userData.token

			return await workoutsService.deleteWorkout(workoutId, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//Get workouts by date
export const getWorkoutsByDate = createAsyncThunk(
	"workouts/getWorkoutsByDate",
	async (date, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.userData.token

			return await workoutsService.getWorkoutsByDate(date, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//holds the inital state, any changes we want to make to the state such as using the reset function to reset multiple states. Then we have the extra reducers which handle the asynchronous promises state and their responses. We can change our state based on the response we get under "action.payload." Redux also lets us mutate our state here unlike React
export const workoutsSlice = createSlice({
	name: "workouts",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ""
		},
	},
	extraReducers: (builder) => {
		//builder cases take care of the return from the thunk function's promise. Whether it rejects or fulfills the promise.
		builder
			.addCase(createWorkout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				//for the action payload that returns the response from the thunk function that makes our request, we can just take that response and .push() it into out workout state. We CAN'T normally do this in react because that would be mutating state, but we can with "redux toolkit"

				//Since I changed the createworkout dipatch function to wait before it returns a successful promise before navigating to viewWorkouts page, we might not need to sort below. We can probably get away with just spreading and adding to the new array which will be sorted after the navigating occurs since the we make a GET request for the workouts and the backend send them sorted by date already. Probably don't need to make it happen in both places.

				//prettier-ignore
				state.workouts = [action.payload, ...state.workouts].slice().sort((a, b) => a.created - b.created)
			})
			.addCase(createWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
			})
			.addCase(deleteWorkout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				//for the action payload that returns the response from the thunk function that makes our request, we can just take that response and .push() it into out workout state. We CAN'T normally do this in react because that would be mutating state, but we can with "redux toolkit"
				state.workouts = state.workouts.filter(
					(workout) => action.payload._id !== workout._id
				)
			})
			.addCase(deleteWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
			})
			.addCase(getWorkouts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getWorkouts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.workouts = action.payload
			})
			.addCase(getWorkouts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
				// console.log("Error from workout slice " + action.payload)
			})
			.addCase(editWorkout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(editWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				//for the action payload that returns the response from the thunk function that makes our request, we can just take that response and .push() it into out workout state. We CAN'T normally do this in react because that would be mutating state, but we can with "redux toolkit"
				state.workouts = state.workouts.map((workout) => {
					if (workout._id === action.payload._id) {
						return action.payload
					} else {
						return workout
					}
				})
			})
			.addCase(editWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
			})
			.addCase(getWorkoutsByDate.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getWorkoutsByDate.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.workouts = action.payload
			})
			.addCase(getWorkoutsByDate.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
			})
	},
})

export const { reset } = workoutsSlice.actions
export default workoutsSlice.reducer
