import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa"
import { Container2 } from "../components/styles/Container.styled";
import { Form2 } from "../components/styles/Form.styled";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { HomeHeader } from "../components/HomeHeader";


export function Register(){

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  function handleChange(event){
    const {name, value} = event.target
    setUser((user) => {
      return {
        ...user,
        [name] : value
      }
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    if(user.password !== user.confirmPassword){
      alert("Passwords do not Match!")
    }else{
    axios.post("http://localhost:5000/users/", user)
    .then((response) => {
      console.log(response.data)
      localStorage.setItem("token", response.data.token) //HAVE TO SAVE THE TOKEN AS STRING (JSON.stringify() method)
      //JSON.parse() method to retriever token from local storage as a value
      navigate("/viewWorkouts")
    }).catch(err => {
      console.log(err)
    })
    }
  }
  
  return(
    <>
    <HomeHeader />
    <Container2>
    <section>
      <h1><FaUser/> Register</h1>
      <p>Please Create an Account</p>
    </section>

    <section>
      <Form2 onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter name" name="name" value={user.name} onChange={handleChange} />
        <input type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange}/>
        <input type="password" placeholder="Enter password" name ="password" value={user.password} onChange={handleChange}/>
        <input type="password" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
        <button>Submit</button>
      </Form2>
    </section>
    </Container2>
    </>
  )
}