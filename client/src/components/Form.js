import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios"

export function Form(){
  const [title, setTitle] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  

  const storeWorkout = () =>{
    Axios.post('http://localhost:5000/home/createWorkout', {
      title : title,
      exercise : exercise,
      sets : sets,
      reps : reps
    }).then((response) => alert("Successfully added to the database from the front end!!!!") )
  }  

  return(
    <div>
      <label htmlFor ="workout">Workout</label>
      <input id="workout" type="text" name = "title" onChange = {(event) => {setTitle(event.target.value)}}/>
      <label htmlFor ="exercise" >Exercise</label>
      <input id="exercise" type="text" name = "exercise" onChange = {(event) => {setExercise(event.target.value)}}/>
      <label htmlFor ="sets" >Sets</label>
      <input id="sets" type="number" name = "sets" onChange = {(event) => {setSets(event.target.value)}}/>
      <label htmlFor="reps">Sets</label>
      <input id="reps" type="number" name = "reps" onChange = {(event) => {setReps(event.target.value)}}/>
      <button type="submit" onClick={storeWorkout}>Store Workout</button>
      </div>
  )
}