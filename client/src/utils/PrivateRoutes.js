import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoutes = () => {
	const { userData } = useSelector((state) => state.auth)

	return userData ? <Outlet /> : <Navigate to="/login" />
}

const PrivateLoginRegisterRoute = () => {
	const { userData } = useSelector((state) => state.auth)

	return userData ? <Navigate to="/" /> : <Outlet />
}

export { PrivateRoutes, PrivateLoginRegisterRoute }
