import React from "react";
import { StyledFooter } from "./styles/Footer.styled";

//Creating the another function component outside of the main function component and the calling the outside component from the main component as a child component is best practice that way we don't unmount and remount the outside function component everytime the main component rerenders! We only re-render it when the main function component re-renders as standard React rules!

// const Something = () => {
//   return (
//     <div> 
//       <p>Hello!</p>
//     </div>
//   )
// }

export function Footer({children}){

 


  return(
    <StyledFooter>
      {children}
      {/* <Something /> */}
    </StyledFooter>
  )
}