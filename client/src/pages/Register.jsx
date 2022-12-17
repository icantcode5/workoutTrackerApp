import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa"
import { Container2 } from "../components/styles/Container.styled";
import { Form2 } from "../components/styles/Form.styled";

export function Register(){


  const {formData, setFormData} = useState({
    name1: "",
    email : "",
    password : "",
    password2 : ""
  })

  const {name, email, password, password2} = formData || {}

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value 
    }))
  }
  
  return(
    <>
    <Container2>
    <section>
      <h1> <FaUser /> Register </h1>
      <p>Please Register</p>
    </section>

    <section>
      <Form2 onSubmit={onSubmit}>
        <input type="text" placeholder="Enter name" name="name" value={name} onChange={onChange} />
        <input type="email" placeholder="Enter email" name="email" value={email} onChange={onChange}/>
        <input type="password" placeholder="Enter password" name ="password" value={password} onChange={onChange}/>
        <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange}/>
        <button> Submit</button>
      </Form2>
    </section>
    </Container2>
    </>
  )
}