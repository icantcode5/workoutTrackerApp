import axios from "axios";
import React from "react";
import { useState} from "react"
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/Form.styled";


export function EditWorkout({workouts, setWorkouts}){
  const { id } = useParams()
  const navigate = useNavigate()

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
    axios.put(`http://localhost:5000/workout/editWorkout/${id}`, workout,{
      headers: {
        authorization : localStorage.getItem("token")
      }
    }).then((response) => {
      setWorkouts(prevArr => {
        return prevArr.map(workoutObj => {
          if(workoutObj._id === id){
            return workout
          }else{
            return workoutObj
          }
        })
      })
      navigate('/viewWorkouts')
    }).catch(err => {
      console.log(err)
    })
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