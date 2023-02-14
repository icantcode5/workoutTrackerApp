import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import workoutsService from "./workoutsService"

const initialState = {
	workouts: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
}

//Create a new workout
export const createWorkout = createAsyncThunk(
	"workouts/createWorkout",
	async (workoutData, thunkAPI) => {
		try {
			//we are getting the current userState's token which we saved in our "auth" state. We can also get the token from our localStorage too!
			const token = thunkAPI.getState().auth.userData.token
			console.log(token)
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

//holds the inital state, any changes we want to make to the state such as using the reset function to reset multiple states. Then we have the extra reducers which handle the asynchronous promises state and their responses. We can choose to change our state based on the response we get under "action.payload"
export const workoutsSlice = createSlice({
	name: "workouts",
	initialState,
	reducers: {
		reset: (state) => {
			return initialState
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createWorkout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				//for the action payload that returns the response from the thunk function that makes our request, we can just take that response and .push() it into out workout state. We CAN'T normally do this in react because that would be mutating state, but we can with "redux toolkit"
				state.workouts = [action.payload, ...state.workouts]
			})
			.addCase(createWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
			})
	},
})

export const { reset } = workoutsSlice.actions
export default workoutsSlice.reducer
