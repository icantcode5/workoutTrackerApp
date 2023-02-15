import axios from "axios";
import React from "react";
import { useState} from "react"
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/Form.styled";
//import redux state
import {useDispatch, useSelector} from "react-redux"
import { editWorkout } from "../features/workouts/workoutsSlice";
import { useEffect } from "react";


export function EditWorkout(){
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {workouts, isError, isSuccess, message} = useSelector((state) => {
    return state.workouts
  })

  useEffect(()=> {
    if(isError){
      console.log("Firing isError " + message)
    }
    if(isSuccess){
      navigate("/viewWorkouts")
    }
  },[isError, message, isSuccess, navigate])

  const currentWorkout = workouts.filter(workout => {
    return workout._id === id
  })[0]

  const [workout, setWorkout] = useState(currentWorkout)

  const handleChange = (e) => {
    const {value, name} = e.target
    setWorkout((prevWorkout) => {
      return {
        ...prevWorkout,
        [name] : value
      }
    })
  }

  const handleUpdate = (event, id) => {
    event.preventDefault()
    //pass the arguments that the PUT request needs (id, and workout object) in array because THUNK function only takes in one argument. We can also pass in an object and then destructure the obj or array in the THUNK function's source code
    dispatch(editWorkout([id, workout]))
  }

  return(
    <>
    <Container>
    <StyledForm onSubmit={(event) => handleUpdate(event, workout._id)}>
      <label htmlFor ="workout">Body-Part</label>
      <input id="workout" type="text" name = "title"  value = {workout.title}  onChange = {handleChange}  />

      <label htmlFor ="exercise" >Exercise</label>
      <input id="exercise" type="text" name = "exercise" value={workout.exercise}  onChange = {handleChange}/>

      <label htmlFor ="sets" >Sets</label>
      <input id="sets" type="number" name = "sets" value={workout.sets}  onChange = {handleChange}/>

      <label htmlFor="reps">Reps</label>
      <input id="reps" type="number" name = "reps" value={workout.reps} onChange = {handleChange}/>
      
      <StyledButton color = "blue">Submit</StyledButton>
    </StyledForm>
    </Container>
    </>
  )
}