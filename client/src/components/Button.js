import React from "react";
import { StyledButton } from "./styles/Button.styled";

export function Button({text}){



  return(
    <StyledButton>
      {text}
    </StyledButton>
  )
}