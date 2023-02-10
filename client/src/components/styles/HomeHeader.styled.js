import styled from "styled-components"

export const HomeHeaderStyled = styled.header`
	/* border: 2px solid red; */
	width: 100%;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid white;
	background-color: lightblue;

	h1 {
		margin-left: 15px;
		position: relative;
		left: 500px;
	}
	//display the line items inside unordered list as flex and remove bullet point
	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		list-style: none;
	}

	ul li {
		margin-left: 20px;
		margin-right: 10px;
	}

	//remove line from under and remove color change when clicked
	a {
		text-decoration: none;
		color: white;
		line-height: 2.2;
	}

	//this helps use align the icon with the anchor tags
	ul li a {
		display: flex;
		align-items: center;
	}

	//move icons just a bit away from the word next to them
	ul li a svg {
		margin-right: 5px;
	}
`
