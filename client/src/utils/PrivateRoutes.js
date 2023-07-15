import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
	//CHANGE THIS TO UTILIZE REDUX USER STATE?
	return localStorage.getItem("user") ? <Outlet /> : <Navigate to="/login" />
}

const PrivateLoginRegisterRoute = () => {
	//prettier-ignore
	return localStorage.getItem("user") ? <Navigate to="/" /> : <Outlet />
}

export { PrivateRoutes, PrivateLoginRegisterRoute }
