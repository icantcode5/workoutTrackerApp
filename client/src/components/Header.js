import React from "react"
import { Link } from "react-router-dom"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import styles from "./styles/Header.module.css"
import { MdOutlineFitnessCenter } from "react-icons/md"
//redux imports
import { useDispatch } from "react-redux"
import { logout } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	//Logout function
	const logoutHandler = () => {
		localStorage.removeItem("user")
		dispatch(logout())
		navigate("/login")
	}

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.titleText}>
					FitFocus <MdOutlineFitnessCenter />
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
