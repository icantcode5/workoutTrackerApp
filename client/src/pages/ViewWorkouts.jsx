import { useNavigate } from 'react-router-dom'
import { StyledButton } from "../components/styles/Button.styled";
import {Footer} from "../components/Footer"
import { StyledHeader } from "../components/styles/Header.styled";
import { Link } from "react-router-dom"
import { Workout } from '../components/Workout';
//redux components
import {useDispatch, useSelector} from "react-redux"
import { getWorkouts, deleteWorkout, reset } from "../features/workouts/workoutsSlice"
import {removeUserData} from "../features/auth/authSlice"
import { useEffect } from "react";
import Spinner from '../components/Spinner';
import styles from "../components/styles/ViewWorkouts.module.css"

export function ViewWorkouts(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userData } = useSelector((state) => state.auth)
  const {workouts, isLoading, isError, message, isSuccess} = useSelector((state) => {
    return state.workouts
  })

  //Capitalize First letter of first and last name. Will probably move this to happen elsewhere
  const name = userData.name.split(' ').map(el => {
    return el[0].toUpperCase() + el.substring(1)
  }).join(' ')

  useEffect(() => {
    dispatch(getWorkouts())
    
    if(isError){
      console.log(message)
    }


    dispatch(reset()) // isSuccess state persists even when we call the dispatch function #bug
  },[dispatch, navigate, isError, message])


  const handleDelete = (id) => {
    dispatch(deleteWorkout(id))
  }

  const logoutHandler = () =>{
    //because we couldn't navigate to the login page without also destroying the userData's state (indicating they are logged out), I had to create a reducer to to change the userData's state to null as well as destroying the user's data from local storage which allowed the user to successfully redirect to the "/login" page in logout button click
    localStorage.removeItem("user")
    dispatch(removeUserData())
    navigate("/login")
  }

  if(isLoading){
    return <Spinner />
  }

  const currentWorkouts = workouts.map((workout,i) => {
    return(
      <Workout 
      key = {workout._id}
      title = {workout.title} 
      created = {workout.created} 
      exercise = {workout.exercise} 
      sets = {workout.sets}
      reps = {workout.reps} 
      workoutId = {workout._id}
      handleDelete = {handleDelete}/>
    )
  })


  return(
    <>
    <StyledHeader>
    <h1>Hello, {name}, here are your personally logged workouts</h1>
    <StyledButton color ="white" onClick = {logoutHandler}>Logout</StyledButton>
    </StyledHeader>

    <div className={styles.workoutsFlex}>
      {currentWorkouts}
    </div>

    <Footer>
      <Link to = "/"><StyledButton color="white">Go to Home Page</StyledButton></Link>
      <Link to = "/addWorkout"> <StyledButton color="white">Go to add Workout Page</StyledButton></Link>
    </Footer>
    </>
  )
}
