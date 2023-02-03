import styled from 'styled-components'

export const StyledForm = styled.form`
  width: 100%;
  margin-top: 10px;
  padding: 30px 10px 0px 10px;
  border-radius: 10px;
  background-color: white;
  
  input {
    display : inline-block;
    width : 100%;
    border: solid 3px black;
    border-radius : 5px;
    padding: 5px;
    margin-bottom: 20px;
  }

  button{
    border-radius : 999px;
    margin: 10px 0px 20px 0px;
    padding: 7px 7px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
  }

  input::placeholder{
    
    color : white;
    opacity : .7;
  }

`
export const Form2 = styled(StyledForm)`

width:60%;
margin: 0 auto;

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: 16px;
}

button {
  width:100%;
  border-radius: 5px;
}
`