import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

//Get user from localStorage
const userData = JSON.parse(localStorage.getItem("user")) // update token first

//Initial state is created to check if the user has been successfully created/logged in or display and deal with errors
const initialState = {
	userData: userData ? userData : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
}

//Register user
export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			//the return is call the payload which is what we set our user state to once the async function's promise succeeds
			return await authService.register(user)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			//when the promise fails, we return with the message which is defined above as an error message.
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//Login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const authSlice = createSlice({
	name: "auth",
	initialState,
	//no asynchronous functions here which are the thunk functions
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ""
		},
	},
	// place for thunk functions/async calls
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.userData = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
				state.userData = null
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.userData = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				//when the thunk function returns an error bc of the async function promise failing, we can pass the returned error to our message state to be later displayed for the user
				state.message = action.payload
				state.userData = null
			})
	},
})

//When we have a reducer inside our slice, such as the reset reducer, we have
//to export it from "authSlice.actions" which is how we have to write it in redux since it's opiniated. We can use the reset reducer in all our app now
export const { reset } = authSlice.actions
export default authSlice.reducer
