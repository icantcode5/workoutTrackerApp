import React from "react";
import { Button } from "./Button";
import { StyledFooter } from "./styles/Footer.styled";

export function Footer(){




  return(
    <>
    <StyledFooter>
    <h1>This is the footer</h1>
    <Button text="Go back to Home Page"></Button>
    <Button text="Go back to View Workouts Page"></Button>
    </StyledFooter>
    </>
  )
}