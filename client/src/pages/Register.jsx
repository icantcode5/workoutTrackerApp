import React from "react"
import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import styles from "../components/styles/Register.module.css"
//Redux imports
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"

export function Register() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { userData, isError, isSuccess, message } = useSelector((state) => {
		return state.auth
	})

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess && userData) {
			navigate("/viewWorkouts")
			toast.success("Successfully Registered")
		}

		dispatch(reset())
	}, [userData, isError, isSuccess, message, navigate, dispatch])

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	})

	function handleChange(event) {
		const { name, value } = event.target
		setUser((user) => {
			return {
				...user,
				[name]: value,
			}
		})
	}

	function handleSubmit(event) {
		event.preventDefault()

		if (user.password !== user.confirmPassword) {
			toast.error("Passwords do not match!")
		} else {
			dispatch(register(user))
		}
	}

	return (
		<>
			<Header />
			<section className={styles.formSection}>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please Create an Account</p>

				<form className={styles.form} onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Enter name"
						name="name"
						value={user.name}
						required
						onChange={handleChange}
					/>
					<input
						type="email"
						placeholder="Enter email"
						name="email"
						value={user.email}
						required
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="Enter password"
						name="password"
						value={user.password}
						required
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						value={user.confirmPassword}
						required
						onChange={handleChange}
					/>
					<button>Register</button>
				</form>
			</section>
		</>
	)
}
