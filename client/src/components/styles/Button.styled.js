import styled from "styled-components"

export const StyledButton = styled.button`
  border-radius: 50px;
  border:none;
  cursor: pointer;
  font-size: 16px;
  margin: auto;
  background: ${({color}) => color};
`