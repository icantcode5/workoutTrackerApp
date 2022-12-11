import axios from "axios";
import React from "react";
import { useState, useEffect, } from "react"
import {useNavigate, redirect } from "react-router-dom"
import { useParams } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/Form.styled";
import { GlobalStyles } from "../components/styles/Global";



export function EditWorkout(){
  const { id } = useParams()
  const [workout, setWorkout] = useState({})
  const navigate = useNavigate()

  // const newTitle = useRef()

  const [title, setTitle] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)

  useEffect(() => {
    const getWorkout = async () => { 
      const response = await axios.get(`http://localhost:5000/workout/editWorkout/${id}`)
      setWorkout(response.data)
      console.log("completed get request")
    }
    getWorkout()
  },[id])

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/workout/editWorkout/${id}`, {
      title : title,
      exercise : exercise,
      sets : sets,
      reps : reps
    }).then((response) => {
      setWorkout(response.data)
      setTitle(workout.title)
      setExercise(workout.exercise)
      setSets(workout.sets)
      setReps(workout.reps)
    })
    navigate('/viewWorkouts')
    }
    //figure out how to re-render after navigating to the viewWorkouts page!!!

  return(
    <>
    <GlobalStyles />
    <Container>
    <StyledForm>
      <label htmlFor ="workout">Workout</label>
      <input id="workout" type="text" name = "title"  placeholder={workout.title} onChange = {(event) => {setTitle(event.target.value)}}/>
      <label htmlFor ="exercise" >Exercise</label>
      <input id="exercise" type="text" name = "exercise" placeholder={workout.exercise}  onChange = {(event) => {setExercise(event.target.value)}}/>
      <label htmlFor ="sets" >Sets</label>
      <input id="sets" type="number" name = "sets" placeholder={workout.sets}  onChange = {(event) => {setSets(event.target.value)}}/>
      <label htmlFor="reps">Reps</label>
      <input id="reps" type="number" name = "reps" placeholder={workout.reps} onChange = {(event) => {setReps(event.target.value)}}/>
      <StyledButton color = "blue" onClick = {() => handleUpdate(workout._id)}>Submit</StyledButton>
    </StyledForm>
    </Container>
    </>
  )
}