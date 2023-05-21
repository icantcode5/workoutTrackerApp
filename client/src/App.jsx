import { Routes, Route } from "react-router-dom"
import { AddWorkout } from "./pages/AddWorkout"
import { Home } from "./pages/Home"
import { ViewWorkouts } from "./pages/ViewWorkouts"
import { EditWorkout } from "./pages/EditWorkout"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import "./App.module.css"
//redux imports
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PrivateRoutes from "./utils/PrivateRoutes"

const options = {
	weekday: "long",
	month: "short",
	year: "numeric",
	day: "numeric",
}
const date = new Date().toLocaleDateString("en-us", options)

function App() {
	return (
		<>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/addWorkout" element={<AddWorkout date={date} />} />
					<Route path="/viewWorkouts" element={<ViewWorkouts />} />
					<Route path="/viewWorkouts/:date" element={<ViewWorkouts exact />} />
					<Route path="/editWorkout/:id" element={<EditWorkout />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Home />} />
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App
