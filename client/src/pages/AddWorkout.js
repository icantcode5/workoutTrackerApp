import React from "react"
import { GlobalStyles } from "../components/styles/Global"
import { Header } from "../components/Header"
import { Container } from "../components/styles/Container.styled"
import { QuoteApi } from "../components/QuoteApi"
import { Form } from "../components/Form"
import { Button } from "../components/Button"
import { Footer } from "../components/Footer"

export function AddWorkout(){

  return(
    <>
    <GlobalStyles />
      <Header />
      <Container>
        <QuoteApi />
        <Form />
        <Footer />
      </Container>
    </>
  )
}