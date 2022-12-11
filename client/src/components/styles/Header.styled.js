import styled from "styled-components"

export const StyledHeader = styled.header`
  background-color : lightgrey;
  padding: 10px 10px 70px 10px;
  height : 180px;

   h1 {
    padding-top: 5px;
    font-size: 28px;
    text-align: center;
  }
`
export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  position : relative;
  bottom : 15px;


  p{
    border-radius: 999px;
    border: solid 5px black;
    font-size: 18px;
    padding: 7px;
  }
`