import React from "react"
import { Header } from "../components/Header"
import { Container } from "../components/styles/Container.styled"
import { QuoteApi } from "../components/QuoteApi"
import { Form } from "../components/Form"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled"

export function AddWorkout({workouts,setWorkouts}){

  return(
    <>
      <Header />
      <Container>
        <QuoteApi />
        <Form workouts = {workouts} setWorkouts = {setWorkouts}/>
        <Footer>
          <Link to = "/home"><StyledButton color="white">Go to Home Page</StyledButton></Link>
          <Link to = "/viewWorkouts"> <StyledButton color="white">Go to View Workouts Page</StyledButton></Link>
        </Footer>
      </Container>
    </>
  )
}