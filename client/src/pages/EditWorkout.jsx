import React from "react";
import { useState} from "react"
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled";
import styles from "../components/styles/EditWorkout.module.css"
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

  const currentWorkout = workouts.filter(workout => {
    return workout._id === id
  })[0]

  useEffect(()=> {
    if(isError){
      console.log("Firing isError " + message)
    }
  },[isError, message, isSuccess, navigate])


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
    dispatch(editWorkout([id, workout])) // dispatch method is synchonous
    
    navigate("/viewWorkouts") // ended up putting navigate here instead of in useEffect because since we are fetching the workouts in viewWorkouts, the isSuccess state persists as successful while logged in.
  }

  return(
   <div className={styles.container}>
    <h1 className={styles.heading}>Edit Current Workout</h1>

    <form className={styles.form} onSubmit={(event) => handleUpdate(event, workout._id)}>
      <label htmlFor ="workout">Body-Part</label>
      <input id="workout" type="text" name = "title"  value = {workout.title}  onChange = {handleChange}  />

      <label htmlFor ="exercise" >Exercise</label>
      <input id="exercise" type="text" name = "exercise" value={workout.exercise}  onChange = {handleChange}/>

      <label htmlFor ="sets" >Sets</label>
      <input id="sets" type="number" name = "sets" value={workout.sets}  onChange = {handleChange}/>

      <label htmlFor="reps">Reps</label>
      <input id="reps" type="number" name = "reps" value={workout.reps} onChange = {handleChange}/>

      <label htmlFor="lbs">Reps</label>
      <input id="lbs" type="telephone" name = "lbs" value={workout.lbs} onChange = {handleChange}/>
      
      <StyledButton color = "black">Submit</StyledButton>
    </form>
  </div> 
  )
}