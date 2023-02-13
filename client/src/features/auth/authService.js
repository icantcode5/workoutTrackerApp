import axios from "axios"

//Register user
const register = async (userData) => {
	const response = await axios.post("http://localhost:5000/users/", userData)

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data))
	}

	return response.data
}

//Login user
const login = async (userData) => {
	const response = await axios.post(
		"http://localhost:5000/users/login",
		userData
	)

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data))
	}

	return response.data
}

//This is the object we are exporting which we can then just grab the methods from easily by export defaulting the authService object
const authService = {
	register,
	login,
}

export default authService
