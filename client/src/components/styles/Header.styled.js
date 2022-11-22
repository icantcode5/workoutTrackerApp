import styled from "styled-components"

export const StyledHeader = styled.header`
  background-color : lightgrey;
  padding: 10px 0;

   h1 {
    padding-top: 5px;
    font-size: 28px;
    text-align: center;
  }
`
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin : 20px 0px;

  p{
    border-radius: 999px;
    border: solid 5px black;
    font-size: 18px;
    padding: 7px;
  }
`