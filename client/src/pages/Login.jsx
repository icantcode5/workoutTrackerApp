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
  const [user, setUser] = useState({
  email:"",
  password:""
 })


  function handleSubmit(event){
    event.preventDefault()
    axios.post("http://localhost:5000/users/login", user)
    .then((response) => {
      console.log(response.data)
      localStorage.setItem("token", response.data.token) //store as string
      navigate("/viewWorkouts")
    }).catch(err => {
      console.log(err)
    })
  }
  

  function handleChange(event){
    const {name, value} = event.target
    setUser((user) => {
      return {
        ...user,
        [name]: value
      }
    })
  }

  return(
    <>
    <HomeHeader/>
    <Container2>
      <p><FaSignInAlt/> Login </p>
      <Form2 onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" value={user.email} name="email" onChange={handleChange}/>
        <input type="password" placeholder="Enter Password" autoComplete="off" value={user.password} name="password" onChange={handleChange}/>
        <button>Login</button>
      </Form2>
    </Container2>
  </>
  )
}