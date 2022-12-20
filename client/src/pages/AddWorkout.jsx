import React from "react"
import { GlobalStyles } from "../components/styles/Global"
import { Header } from "../components/Header"
import { Container } from "../components/styles/Container.styled"
import { QuoteApi } from "../components/QuoteApi"
import { Form } from "../components/Form"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"
import { StyledButton } from "../components/styles/Button.styled"

export function AddWorkout(){

  return(
    <>
    <GlobalStyles />
      <Header />
      <Container>
        <QuoteApi />
        <Form />
        <Footer>
          <Link to = "/home"><StyledButton color="navy">Go to Home Page</StyledButton></Link>
          <Link to = "/viewWorkouts"> <StyledButton color="navy">Go to View Workouts Page</StyledButton></Link>
        </Footer>
      </Container>
    </>
  )
}