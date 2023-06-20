import React from "react"
import { useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import styles from "../components/styles/Login.module.css"
//redux imports
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
//Form validation
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const loginSchema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().min(4).max(20).required(),
	})
	//prettier-ignore
	const {register, handleSubmit, formState : {errors}}  = useForm({
		resolver: yupResolver(loginSchema)
	})

	//useSelector is how we grab the state we are keeping track of from the auth slice
	const { userData, isLoading, isError, isSuccess, message } = useSelector(
		(state) => {
			return state.auth
		}
	)

	console.log(isSuccess)
	console.log(userData)

	//If the user successfully signs in and the token in stored in the localStorage from the dispatch(login()) function, the useEffect fires and the user can see his/her workouts or the "toast" error is displayed. Otherwise the dispatch function is called to reset all the state
	useEffect(() => {
		if (isError) {
			toast.error(message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
			dispatch(reset())
		}

		if (isSuccess && userData) {
			console.log("hello from success login page")
			navigate("/viewWorkouts")
			toast.success("Successfuly signed in!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
			dispatch(reset())
		}

		console.log("hello from login useEffect")
		// dispatch(reset())
	}, [userData, isError, isSuccess, message, dispatch, navigate])

	async function formSubmit(data) {
		dispatch(login(data))
		console.log("hello")
		// navigate("/viewWorkouts")
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<Header />
			<section className={styles.formSection}>
				<p className={styles.loginFormSymbol}>
					<FaSignInAlt /> Login
				</p>
				<form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
					{/* <label htmlFor="email">Email</label> */}
					<input
						id="email"
						type="email"
						placeholder="Enter Email"
						autoComplete="on"
						{...register("email")}
					/>
					<p>{errors.email?.message}</p>

					{/* <label htmlFor="password">Password</label> */}
					<input
						id="password"
						type="password"
						placeholder="Enter Password"
						autoComplete="off"
						{...register("password")}
					/>
					<p>{errors.password?.message}</p>
					<button>Login</button>
				</form>
			</section>
		</>
	)
}
