import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa"
import { Container2 } from "../components/styles/Container.styled";
import { Form2 } from "../components/styles/Form.styled";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../components/HomeHeader";
//redux imports
import {useSelector, useDispatch} from "react-redux"
import {login, reset} from "../features/auth/authSlice"
import {toast} from "react-toastify"

export function Login({setLoggedIn}){

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
    toast.error(message)
  }

  if(userData || isSuccess){
    navigate('/viewWorkouts')
  }

  dispatch(reset())
 },[userData, isError, isSuccess, message, dispatch, navigate])

  function handleSubmit(event){
    event.preventDefault()
    dispatch(login(user))
    setLoggedIn(true)
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
    console.log("Spinner component goes here")
  }

  return(
    <>
    <HomeHeader/>
    <Container2>
      <p><FaSignInAlt/> Login </p>
      <Form2 onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" value={user.email} name="email" onChange={handleChange}/>
        <input type="password" placeholder="Enter Password" autoComplete="off" value={user.password} name="password" onChange={handleChange}/>
        <button>Login</button>
      </Form2>
    </Container2>
  </>
  )
}