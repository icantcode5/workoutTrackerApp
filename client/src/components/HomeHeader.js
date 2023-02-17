import React from "react"
import { HomeHeaderStyled } from "./styles/HomeHeader.styled"
import { Link } from "react-router-dom"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"
import styles from "./styles/HomeHeader.module.css"
//redux imports
import { useSelector, useDispatch } from "react-redux"
import { removeUserData } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export function HomeHeader() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logoutHandler = () => {
		localStorage.removeItem("user")
		dispatch(removeUserData())
		navigate("/login")
	}

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.titleText}>
					Welcome To Your Personal Workout Tracker
				</h1>
				<ul>
					{localStorage.getItem("user") ? (
						<li>
							{" "}
							<Link to="/login" onClick={logoutHandler}>
								{" "}
								<FaSignOutAlt /> Logout
							</Link>
						</li>
					) : (
						<>
							<li>
								<Link to="/login">
									{" "}
									<FaSignInAlt /> Login
								</Link>
							</li>
							<li>
								<Link to="/register">
									{" "}
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
