import styled from "styled-components"

export const Container = styled.div`
  width: 800px;
  max-width : 100%;
  margin: 0px auto;
  /* text-align:center; */
`

export const Container2 = styled(Container)`
width: 100%;
max-width:960px;
text-align: center;
border: solid 2px red;
`