import React from "react"
import { Header } from "../components/Header"
import { Container } from "../components/styles/Container.styled"
import { QuoteApi } from "../components/QuoteApi"
import { WorkoutForm } from "../components/WorkoutForm"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled"

export function AddWorkout(){

  return(
    <>
      <Header />
      <Container>
        <QuoteApi />
        <WorkoutForm />
        <Footer>
          <Link to = "/"><StyledButton color="white">Go to Home Page</StyledButton></Link>
          <Link to = "/viewWorkouts"> <StyledButton color="white">Go to View Workouts Page</StyledButton></Link>
        </Footer>
      </Container>
    </>
  )
}