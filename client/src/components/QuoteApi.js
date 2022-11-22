import React from "react"
import { useState, useEffect } from "react"
import  Axios  from "axios"
import { StyledQuoteApi } from "./styles/QuoteApi.styled"

export function QuoteApi(){

  const [quote, setQuote] = useState([])

  useEffect(() => {
    async function getQuote(){
      const response = await Axios.get("https://type.fit/api/quotes")
      setQuote(response.data)
    }
    getQuote()
  },[])

  

  return(
    <StyledQuoteApi>
     
    </StyledQuoteApi>
  )
}