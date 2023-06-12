import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
	return localStorage.getItem("user") ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
