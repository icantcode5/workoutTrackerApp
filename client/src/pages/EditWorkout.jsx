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
  const [workouts, setWorkouts] = useState([])
  const navigate = useNavigate()


  const [title, setTitle] = useState('')
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)

  useEffect(() => {
    const getWorkout = async () => { 
      const response = await axios.get(`http://localhost:5000/workout/editWorkout/${id}`,{
        headers : {
          authorization : localStorage.getItem("token")
        }
      })
      setWorkout(response.data)
    }
    getWorkout()
  },[id])

  //This method is to re render the current workouts once the PUT method has been accomplished in order to show the updated workout as part of all the up to date workouts.
  function fetchWorkouts(){
    axios.get("http://localhost:5000/workout/viewWorkouts", {
      headers: {
        authorization : localStorage.getItem("token")
      }
    }).then((response)=> setWorkouts(response.data))
  }

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/workout/editWorkout/${id}`, {
      title : title,
      exercise : exercise,
      sets : sets,
      reps : reps
    },{
      headers: {
        authorization : localStorage.getItem("token")
      }
    }).then((response) => {
      console.log(response.data)
    })

    //I think since we're calling fetchWorkouts() outside of the PUT method, all the workouts are first fetched (GET) and stored in "workouts" when we submit the PUT method. Then the PUT request resolves successfully which causes a State change (re-render) of setWorkouts and another GET request is triggered since one of the workouts has been updated. Then we navigate to view Workouts which shows the up to date workouts! (Still sharing the setWorkout hook and it works here because we use it at first just to render the target document and then to hold the updated workouts. Update, not sharing the hook anymore and it still works!)

    fetchWorkouts()
    navigate('/viewWorkouts')
  }

  return(
    <>
    <GlobalStyles />
    <Container>
    <StyledForm>
      {/* figure out how to show the current value of the workout we are viewing in the input field before we begin to make changes! */}
      <label htmlFor ="workout">Workout</label>
      <input id="workout" type="text" name = "title"  onChange = {(event) => setTitle(event.target.value)} placeholder={workout.title}/>
      <label htmlFor ="exercise" >Exercise</label>
      <input id="exercise" type="text" name = "exercise" placeholder={workout.exercise}  onChange = {(event) => setExercise(event.target.value)}/>
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