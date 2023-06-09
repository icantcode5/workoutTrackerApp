import React from "react"
import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import styles from "../components/styles/Register.module.css"
//Redux imports
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice" //TAKE A LOOK AT THIS, REGISTER MIGHT BE BROKEN, HAVE TO RENAME
import { toast } from "react-toastify"
//Form validation
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export function Register() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	//prettier-ignore
	const registerSchema = yup.object().shape({
		name: yup.string().required().min(3).max(20),
		email: yup.string().email().required(),
		password: yup.string().min(4).max(20).required(),
		confirmPassword: yup.string().oneOf([yup.ref("password"), null]).min(4).max(20).required()
	})
	//prettier-ignore
	const {register, handleSubmit, formState : {errors}}  = useForm({
		resolver: yupResolver(registerSchema)
	})

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

	//Register User
	function formSubmit(data) {
		dispatch(register(data))
	}

	return (
		<>
			<Header />
			<section className={styles.formSection}>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please Create an Account</p>

				<form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
					<input
						id="name"
						type="text"
						placeholder="Enter name"
						required
						{...register("name")}
					/>
					<p>{errors.name?.message}</p>

					<input
						id="email"
						type="email"
						{...register("email")}
						placeholder="Enter email"
					/>
					<p>{errors.email?.message}</p>

					<input
						id="pasword"
						type="password"
						placeholder="Enter password"
						{...register("password")}
					/>
					<p>{errors.password?.message}</p>

					<input
						id="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						{...register("confirmPassword")}
					/>
					<p>{errors.confirmPassword?.message}</p>

					<button>Register</button>
				</form>
			</section>
		</>
	)
}
