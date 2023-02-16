import { useNavigate } from 'react-router-dom'
import { StyledButton } from "../components/styles/Button.styled";
import { StyledBlock } from "../components/styles/DisplayWorkout.styled";
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

export function ViewWorkouts(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [loggedIn, setLoggedIn] = useState(!!!localStorage.getItem("user"))

  const {workouts, isLoading, isError, message, isSuccess} = useSelector((state) => {
    return state.workouts
  })

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
    <h1>Hello, {} Here are your personally logged workouts</h1>
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
