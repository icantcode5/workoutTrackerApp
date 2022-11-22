import { StyledHeader, Nav } from "./styles/Header.styled"

export function Header(){
  const date = new Date()
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

  
  return(
    <StyledHeader>
      <h1>Home Page</h1>
      <Nav>
        <p>Hello, Welcome Carlos</p>
        <p>{month}, {day}, {year}</p>
      </Nav>
    </StyledHeader> 
  )
}