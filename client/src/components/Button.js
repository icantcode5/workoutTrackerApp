import React from "react";
import { StyledButton } from "./styles/Button.styled";

export function Button({children}){



  return(
    <StyledButton>
      {children}
    </StyledButton>
  )
}