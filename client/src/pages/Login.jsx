import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../components/HomeHeader";
import styles from "../components/styles/Login.module.css"
//redux imports
import {useSelector, useDispatch} from "react-redux"
import {login, reset} from "../features/auth/authSlice"
import {toast} from "react-toastify"
import Spinner from '../components/Spinner'


export function Login(){

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState({
  email:"",
  password:""
 })

 //useSelector is how we grab the state we are keeping track of from the auth slice
 const {userData, isLoading, isError, isSuccess, message} = useSelector((state)=>{
  return state.auth
 })

 //If the user successfully signs in and the token in stored in the localStorage from the dispatch(login()) function, the useEffect fires and the user can see his/her workouts or the "toast" error is displayed. Otherwise the dispatch function is called to reset all the state 
 useEffect(() => {
  if(isError){
    console.log(isError)
    
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
  }

  if(isSuccess){
    navigate('/viewWorkouts')
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
  }

  dispatch(reset())
 },[userData, isError, isSuccess, message, dispatch, navigate])

  function handleSubmit(event){
    event.preventDefault()
    dispatch(login(user))
  }
  

  function handleChange(event){
    const {name, value} = event.target
    setUser((user) => {
      return {
        ...user,
        [name]: value
      }
    })
  }

  if(isLoading){
    return <Spinner />
  }

  return(
    <>
    <HomeHeader/>
    <section className={styles.formSection}>
        <p className={styles.loginFormSymbol}><FaSignInAlt/> Login </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter email" value={user.email} name="email" onChange={handleChange}/>
          <input type="password" placeholder="Enter Password" autoComplete="off" value={user.password} name="password" onChange={handleChange}/>
          <button>Login</button>
        </form>
      </section>
    </>
  )
}