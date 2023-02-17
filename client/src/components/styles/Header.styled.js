import styled from "styled-components"

export const StyledHeader = styled.header`
	/* background-color : #00162A; */
	background-color: black;
	/* padding: 10px 10px 70px 10px; */
	height: 140px;
	display: flex;
	align-items: center;
	justify-content: space-around;

	h1 {
		padding-top: 5px;
		font-size: 28px;
		text-align: center;
		color: white;
		font-family: Arial, Helvetica, sans-serif;
	}

	button {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1rem;
		font-weight: 600;
		width: 100px;
		margin: 0px;
		border-radius: 50px;
		padding: 10px 12px;
		border: none;
		background-color: white;
		color: black;
	}
`
export const Nav = styled.nav`
	display: flex;
	justify-content: space-around;
	position: relative;
	bottom: 35px;
	color: white;

	p {
		border-radius: 999px;
		border: solid 5px black;
		font-size: 18px;
		padding: 7px;
	}
`
