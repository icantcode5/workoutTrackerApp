import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { StyledButton } from "../components/styles/Button.styled";
import { StyledBlock } from "../components/styles/DisplayWorkout.styled";
import { StyledDiv } from "../components/styles/Div.styled";
import {Footer} from "../components/Footer"
import { GlobalStyles } from "../components/styles/Global";
import { StyledHeader } from "../components/styles/Header.styled";
import { Link } from "react-router-dom"



export function ViewWorkouts(){
  const navigate = useNavigate()

  const [workouts, setWorkouts] = useState([])
  
  useEffect(() => {
   axios.get("http://localhost:5000/workout/viewWorkouts",{
    headers : {
      authorization :localStorage.getItem("token")
    } 
   })
   .then(response => setWorkouts(response.data))
  },[])


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/workout/deleteWorkout/${id}`, {
      headers : {
        authorization: localStorage.getItem("token")
      }
    })
    .then(response => {
      const newWorkouts = workouts.filter((workout) => workout._id !== id)
      setWorkouts(newWorkouts)
    })
    //don't need a response because our backend successfully handles the delete method. Now we just need to set the workouts array to hold the new workouts minus the one deleted in order to trigger a re-render after we delete a document from the backend. 
  }

  const logoutHandler = () =>{
    localStorage.removeItem("token")
    navigate('/login')
  }


  return(
    <>
    <GlobalStyles />

    <StyledHeader>
    <h1>Here are your personally logged workouts</h1>
    <Link to = "/login"> <StyledButton color ="navy" onClick = {logoutHandler}>Logout</StyledButton> </Link>
    </StyledHeader>
    
    <StyledBlock>
      {workouts.map((workout,i) => {
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
      })}
    </StyledBlock>

    <Footer>
      <Link to = "/home"><StyledButton color="navy">Go to Home Page</StyledButton></Link>
      <Link to = "/addWorkout"> <StyledButton color="navy">Go to add Workout Page</StyledButton></Link>
    </Footer>
    </>
  )
}