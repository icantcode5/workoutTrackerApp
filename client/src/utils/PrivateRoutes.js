import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetWorkoutsQuery } from "../features/workouts/workoutsSlice"

const PrivateRoutes = () => {
	const { userData } = useSelector((state) => state.auth)

	// const { data } = useGetWorkoutsQuery()

	// return userData ? <Outlet /> : <Navigate to="/login" />
	return userData ? <Outlet /> : <Navigate to="/login" />
}

const PrivateLoginRegisterRoute = () => {
	const { userData } = useSelector((state) => state.auth)
	// const { data } = useGetWorkoutsQuery()

	// return userData ? <Navigate to="/" /> : <Outlet />
	return userData ? <Navigate to="/" /> : <Outlet />
}

export { PrivateRoutes, PrivateLoginRegisterRoute }
