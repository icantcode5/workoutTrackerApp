import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")) // update token first

const initialState = {
	user: user ? user : null,
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
			// return await authService.register(user)
		} catch (err) {
			console.log(err)
		}
	}
)

export const authSlice = createSlice({
	name: "auth",
	initialState,
	//no asynchronous functions here which are the thunk functions
	reducers: {
		reset: (state) => {
			// eslint-disable-next-line no-unused-expressions
			;(state.isLoading = false),
				(state.isError = false),
				(state.isSuccess = false),
				(state.message = "")
		},
	},
	// place for thunk functions/async calls
	extraReducers: () => {},
})

//When we have a reducer inside our slice, such as the reset reducer, we have
//to export it from "authSlice.actions" which is how we have to write it in redux since it's opiniated. We can use the reset reducer in all our app now
export const { reset } = authSlice.actions
export default authSlice.reducer
