import React from "react"
import { AddWorkoutHeader } from "../components/AddWorkoutHeader.js"
import { QuoteApi } from "../components/QuoteApi"
import { WorkoutForm } from "../components/WorkoutForm"

export function AddWorkout(){

  return(
    <>
      <AddWorkoutHeader />
      <QuoteApi />
      <WorkoutForm />
    </>
  )
}