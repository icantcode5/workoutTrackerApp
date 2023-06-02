import React from "react"
import { Link } from "react-router-dom"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import styles from "./styles/Home.module.css"
import { MdOutlineFitnessCenter } from "react-icons/md"
//redux imports
import { useDispatch } from "react-redux"
import { removeUserData, logout } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export function HomeHeader() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logoutHandler = () => {
		localStorage.removeItem("user")
		// dispatch(removeUserData())
		dispatch(logout())
		navigate("/login")
	}

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.titleText}>
					Welcome To Your Personal Workout Tracker <MdOutlineFitnessCenter />
				</h1>
				<ul>
					{localStorage.getItem("user") ? (
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
				</ul>
			</header>
		</>
	)
}
