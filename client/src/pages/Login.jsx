import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa"
import { Container2 } from "../components/styles/Container.styled";
import { Form2 } from "../components/styles/Form.styled";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { HomeHeader } from "../components/HomeHeader";

export function Login(){

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const loginHandler = () => {
    axios.post("http://localhost:5000/users/login",{
      email : email,
      password : password
    }).then((response) => {
      console.log(response.data)
      localStorage.setItem("token", response.data.token)
      navigate("/viewWorkouts")
    })
    }
  

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return(
    <>
    <HomeHeader />
    <Container2>
    <section>
      <p> <FaSignInAlt /> Login </p>
    </section>

    <section>
      <Form2 onSubmit={onSubmit}>
        <input type="email" placeholder="Enter email" value={email} name="email" onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter Password" autoComplete="off" value={password} name="password" onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={loginHandler}>Login</button>
      </Form2>
    </section>
    </Container2>
  </>
  )
}