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
import { PrivateRoutes, PrivateLoginRegisterRoute } from "./utils/PrivateRoutes"

function App() {
	return (
		<>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/addWorkout" element={<AddWorkout />} />
					<Route path="/viewWorkouts" element={<ViewWorkouts />} />
					<Route path="/viewWorkouts/:date" element={<ViewWorkouts exact />} />
					<Route path="/editWorkout/:id" element={<EditWorkout />} />
				</Route>
				<Route element={<PrivateLoginRegisterRoute />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route path="/" element={<Home />} />
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App
