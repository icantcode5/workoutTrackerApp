import React from "react"
import { GlobalStyles } from "../components/styles/Global"
import { Header } from "../components/Header"
import { Container } from "../components/styles/Container.styled"
import { QuoteApi } from "../components/QuoteApi"
import { Form } from "../components/Form"
import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { useNavigate, Link } from "react-router-dom"

export function AddWorkout(){

  const navigate = useNavigate()

  // function toHomePage(e){
  //   e.preventDefault()
  //   navigate('/home')
  // }

  // function toAddWorkoutPage(e){
  //   e.preventDefault()
  //   navigate('/addWorkout')
  // }

  // function toViewWorkoutsPage(e){
  //   e.preventDefault()
  //   navigate("/viewWorkouts")
  // }

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