import React from "react"
import { GlobalStyles } from "../components/styles/Global"
import { Header } from "../components/Header"
import { Container } from "../components/styles/Container.styled"
import { QuoteApi } from "../components/QuoteApi"
import { Form } from "../components/Form"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"

export function AddWorkout(){



  return(
    <>
    <GlobalStyles />
      <Header />
      <Container>
        <QuoteApi />
        <Form />
        <Footer>
          <Link to = "/home">Go to Home Page</Link>
          <Link to = "/viewWorkouts">Go to View Workouts Page</Link>
        </Footer>
      </Container>
    </>
  )
}