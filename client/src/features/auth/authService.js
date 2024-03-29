import axios from "axios"
//Register user
const register = async (userData) => {
	let response
	if (process.env.NODE_ENV === "development") {
		response = await axios.post("http://localhost:5000/users", userData)
	} else {
		response = await axios.post("https://fitfocus.onrender.com/users", userData)
	}

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data))
	}

	return response.data
}

//Login user
const login = async (userData) => {
	let response

	if (process.env.NODE_ENV === "development") {
		response = await axios.post("http://localhost:5000/users/login", userData)
	} else {
		//prettier-ignore
		response = await axios.post("https://fitfocus.onrender.com/users/login", userData)
	}

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data))
	}

	return response.data
}

//Added logout API call to remove jwt from cookie headers.
const logout = async () => {
	let response

	if (process.env.NODE_ENV === "development") {
		response = await axios.post("http://localhost:5000/users/logout")
	} else {
		//prettier-ignore
		response = await axios.post("https://fitfocus.onrender.com/users/logout")
	}

	if (response.data) {
		localStorage.removeItem("user")
	}

	return
}

const getNewAccessToken = async () => {
	let response
	if (process.env.NODE_ENV === "development") {
		response = await axios.get("http://localhost:5000/api/refreshToken")
	} else {
		//prettier-ignore
		response = await axios.get("https://fitfocus.onrender.com/api/refreshToken")
	}

	if (response.data) {
		const { accessToken } = response.data
		const user = JSON.parse(localStorage.getItem("user"))
		//prettier-ignore
		localStorage.setItem("user", JSON.stringify({...user, accessToken: accessToken}))
	}
	return response.data
}

//This is the object we are exporting which we can then just grab the methods from easily by export defaulting the authService object
const authService = {
	register,
	login,
	logout,
	getNewAccessToken,
}

export default authService
