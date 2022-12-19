import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa"
import { Container2 } from "../components/styles/Container.styled";
import { Form2 } from "../components/styles/Form.styled";

export function Login(){

  const {formData, setFormData} = useState({
    name: "",
    email : "",
    password : ""
  })

  const {name, email, password } = formData || {}

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return(
    <Container2>
    <section>
      <p> <FaSignInAlt /> Login </p>
    </section>

    <section>
      <Form2 onSubmit={onSubmit}>
        <input type="text" placeholder="Enter Name" value={name} name="name"  onChange={onChange}/>
        <input type="email" placeholder="Enter email" value={email} name="email" onChange={onChange}/>
        <input type="password" placeholder="Enter Password" value={password} name="password" onChange={onChange}/>
        <button>Login</button>
      </Form2>
    </section>
    </Container2>
  )
}