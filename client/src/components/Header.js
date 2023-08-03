import React from "react"
import { Link, useLocation } from "react-router-dom"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import styles from "./styles/Header.module.css"
import { MdOutlineFitnessCenter } from "react-icons/md"
//redux imports
import { useDispatch } from "react-redux"
//prettier-ignore
import { logout, resetUserData, reset as authReset } from "../features/auth/authSlice"
//prettier-ignore
import {resetWorkouts, reset as workoutStatusReset } from "../features/workouts/workoutsSlice"
import { useNavigate } from "react-router-dom"

export function Header() {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	//Logout function
	const logoutHandler = async () => {
		await dispatch(logout()) // await is needed so that logout state finishes before resetting auth and workout states
		dispatch(resetUserData())
		dispatch(authReset())
		dispatch(resetWorkouts())
		dispatch(workoutStatusReset())
		navigate("/login")
	}

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.titleText}>
					FitFocus <MdOutlineFitnessCenter />
				</h1>
				<ul>
					<>
						{location.pathname.startsWith("/viewWorkouts") ? (
							<li>
								<Link to="/login" onClick={logoutHandler}>
									<FaSignOutAlt /> Logout
								</Link>
							</li>
						) : !location.pathname.startsWith("/viewWorkouts") &&
						  localStorage.getItem("user") ? (
							<>
								<li>
									<Link to="/viewWorkouts">View Workouts</Link>
								</li>
								<li>
									<Link to="/login" onClick={logoutHandler}>
										<FaSignOutAlt /> Logout
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/login">
										<FaSignInAlt /> Login
									</Link>
								</li>
								<li>
									<Link to="/register">
										<FaUser /> Register
									</Link>
								</li>
							</>
						)}
					</>
				</ul>
			</header>
		</>
	)
}
