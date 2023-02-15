import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { StyledButton } from "../components/styles/Button.styled";
import { StyledBlock } from "../components/styles/DisplayWorkout.styled";
import { StyledDiv } from "../components/styles/Div.styled";
import {Footer} from "../components/Footer"
import { StyledHeader } from "../components/styles/Header.styled";
import { Link } from "react-router-dom"
//redux components
import {useDispatch, useSelector} from "react-redux"
import { deleteWorkout } from "../features/workouts/workoutsSlice"
import { useEffect } from "react";

export function ViewWorkouts({workouts, setWorkouts}){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isLoading, isError, isSuccessful, message} = useSelector((state) => {
    return state.workouts
  })

  useEffect(()=> {
    if(isError){
      console.log(message)
    }

    if(isSuccessful){
      console.log("Success!")
    }

},[isError, message, isSuccessful])

  const handleDelete = (id) => {
    dispatch(deleteWorkout(id))
    // axios.delete(`http://localhost:5000/workout/deleteWorkout/${id}`, {
    //   headers : {
    //     authorization: localStorage.getItem("user")
    //   },
    // }
    // ).then((response)=> {
    //   setWorkouts(() => {
    //     return workouts.filter(workout => {
    //       return workout._id !== id
    //     })
    //   })
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  const logoutHandler = () =>{
    localStorage.removeItem("user")
    navigate('/login')
    console.log("logged out")
  }

  if(isLoading){
    console.log("...Loading")
  }

  const currentWorkouts = workouts.map((workout,i) => {
    return(
      <StyledDiv key = {i}>
        <h2>Workout : {workout.title}</h2>
        <p>Date completed : {new Date(workout.created).toDateString()}</p>
        <p>Exercise : {workout.exercise}</p>
        <p>Sets completed: {workout.sets}</p>
        <p>Reps completed: {workout.reps}</p>
      <div>
      <StyledButton color ="limegreen" onClick={() => navigate(`/editWorkout/${workout._id}`)}>Edit Workout</StyledButton>
      <StyledButton color = "red" onClick={() => handleDelete(workout._id)}>Delete Workout</StyledButton>
    </div>
    </StyledDiv>
    )
  })


  return(
    <>
    <StyledHeader>
    <h1>Here are your personally logged workouts</h1>
    <StyledButton color ="navy" onClick = {logoutHandler}>Logout</StyledButton>
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