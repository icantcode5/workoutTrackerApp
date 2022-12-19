import React from "react";
import { useState } from "react";
import Axios from "axios"
import { StyledForm } from "./styles/Form.styled";
import { useNavigate } from 'react-router-dom'

export function Form(){
  const [title, setTitle] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  
  const navigate = useNavigate()

  const storeWorkout = () => {
    Axios.post('http://localhost:5000/workout/createWorkout', {
      title : title,
      exercise : exercise,
      sets : sets,
      reps : reps
    },{
      headers : {
        authorization : localStorage.getItem("token")
      }
    })
    navigate('/viewWorkouts')
  }  
  
  
  return(
    <StyledForm>
      <label htmlFor ="workout">Workout</label>
      <input id="workout" type="text" name = "title" onChange = {(event) => {setTitle(event.target.value)}}/>
      <label htmlFor ="exercise" >Exercise</label>
      <input id="exercise" type="text" name = "exercise" onChange = {(event) => {setExercise(event.target.value)}}/>
      <label htmlFor ="sets" >Sets</label>
      <input id="sets" type="number" name = "sets" onChange = {(event) => {setSets(event.target.value)}}/>
      <label htmlFor="reps">Reps</label>
      <input id="reps" type="number" name = "reps" onChange = {(event) => {setReps(event.target.value)}}/>
      <button type="submit" onClick={storeWorkout}>Store Workout</button>
    </StyledForm>
  )
}