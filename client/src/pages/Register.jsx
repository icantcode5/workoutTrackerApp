import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa"
import { Container2 } from "../components/styles/Container.styled";
import { Form2 } from "../components/styles/Form.styled";
import {useNavigate} from "react-router-dom"
import axios from "axios"

export function Register(){

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')


  const onSubmit = (e) => {
    e.preventDefault()
  }


  const registerHandler = () => {

    if(password !== password2){
      throw new Error("Passwords Must Match")
    }else{
    axios.post("http://localhost:5000/users/",{
      name : name,
      email : email,
      password : password
    }).then((response) => {
      console.log(response.data)
      localStorage.setItem("token",response.data.token)
      navigate("/viewWorkouts")
    })
    }
  }
  
  return(
    <>
    <Container2>
    <section>
      <h1> <FaUser /> Register </h1>
      <p>Please Create an Account</p>
    </section>

    <section>
      <Form2 onSubmit={onSubmit}>
        <input type="text" placeholder="Enter name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter password" name ="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
        <button onClick = {registerHandler}> Submit</button>
      </Form2>
    </section>
    </Container2>
    </>
  )
}