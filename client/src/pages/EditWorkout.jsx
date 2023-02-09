import axios from "axios";
import React from "react";
import { useState, useEffect, } from "react"
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/Form.styled";



export function EditWorkout(){
  const { id } = useParams()

  const [workouts, setWorkouts] = useState([])
  const navigate = useNavigate()


  // const [title, setTitle] = useState(workout.title)
  // const [exercise, setExercise] = useState('')
  // const [sets, setSets] = useState(0)
  // const [reps, setReps] = useState(0)
  // console.log(title)

  const [workout, setWorkout] = useState({
    title: '',
    exercise:'',
    sets: '',
    reps: ''
  })

  useEffect(() => {
    const getWorkout = async () => { 
      const response = await axios.get(`http://localhost:5000/workout/editWorkout/${id}`,{
        headers : {
          authorization : localStorage.getItem("token")
        }
      })
      console.log(response.data)
      setWorkout(response.data)
    }
    getWorkout()
  },[id])


  const handleChange = (e) => {
    const [value, name] = e.target
    setWorkout((prevWorkout) => {
      return {
        ...prevWorkout,
        [name] : value
      }
    })
  }
  //This method is to re render the current workouts once the PUT method has been accomplished in order to show the updated workout as part of all the up to date workouts.
  function fetchWorkouts(){
    axios.get("http://localhost:5000/workout/viewWorkouts", {
      headers: {
        authorization : localStorage.getItem("token")
      }
    }).then((response)=> {
      
      setWorkouts(response.data)

    })
  }

  const handleUpdate = (event, id) => {
    event.preventDefault()
    axios.put(`http://localhost:5000/workout/editWorkout/${id}`, workout,{
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
    <Container>
    <StyledForm onSubmit={(event) => handleUpdate(workout._id)}>
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