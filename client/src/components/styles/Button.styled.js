import styled from "styled-components"

export const StyledButton = styled.button`
	border-radius: 50px;
	border: 1px solid black;
	cursor: pointer;
	font-size: 16px;
	margin: auto;
	padding: 6px 10px;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	background: ${({ color }) => color || "#00162A"};
`
