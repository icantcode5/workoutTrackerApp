import React from "react"
import { useState, useEffect } from "react"
import  Axios  from "axios"
import { StyledQuoteApi } from "./styles/QuoteApi.styled"

export function QuoteApi(){

  const [quote, setQuote] = useState([])

  useEffect(() => {
      Axios.get("https://type.fit/api/quotes")
     .then((response) => setQuote(response.data[Math.floor(Math.random()* 1600)].text))
  },[])


  return(
    <StyledQuoteApi>
      <p>{quote}</p> 
    </StyledQuoteApi>
  )
}