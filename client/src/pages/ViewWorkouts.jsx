import { useNavigate } from 'react-router-dom'
import { StyledButton } from "../components/styles/Button.styled";
import { StyledBlock } from "../components/styles/DisplayWorkout.styled";
import { StyledDiv } from "../components/styles/Div.styled";
import {Footer} from "../components/Footer"
import { StyledHeader } from "../components/styles/Header.styled";
import { Link } from "react-router-dom"
import { Workout } from '../components/Workout';
//redux components
import {useDispatch, useSelector} from "react-redux"
import { getWorkouts, deleteWorkout, reset } from "../features/workouts/workoutsSlice"
import { useEffect } from "react";

export function ViewWorkouts(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {workouts, isLoading, isError, message} = useSelector((state) => {
    return state.workouts
  })

  useEffect(() => {
    if(localStorage.getItem("user")){
      dispatch(getWorkouts())
    }

    if(!localStorage.getItem("user")){
      navigate('/login')
    }

  },[dispatch, navigate])

  useEffect(()=> {
    if(isError){
      console.log(message)
    }

    dispatch(reset()) // reset state here in order to properly be able to navigate to /viewWorkouts after the workout is updated
  },[isError, message, dispatch])

  const handleDelete = (id) => {
    dispatch(deleteWorkout(id))
  }

  const logoutHandler = () =>{
    localStorage.removeItem("user")
    // navigate("/login")
  }

  if(isLoading){
    console.log("Loading Workouts...")
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
    <h1>Here are your personally logged workouts</h1>
    <StyledButton color ="white" onClick = {logoutHandler}>Logout</StyledButton>
    </StyledHeader>
    
    <StyledBlock>
      {currentWorkouts}
    </StyledBlock>

    <Footer>
      <Link to = "/home"><StyledButton color="white">Go to Home Page</StyledButton></Link>
      <Link to = "/addWorkout"> <StyledButton color="white">Go to add Workout Page</StyledButton></Link>
    </Footer>
    </>
  )
}
