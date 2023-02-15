import { StyledHeader, Nav } from "./styles/Header.styled"

export function Header() {
	const date = new Date()
	let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
	month++

	return (
		<StyledHeader>
			<h1>Add Today's Workout</h1>
			<Nav>
				<p>Hello, Welcome Carlos</p>
				<p>
					{month}/{day}/{year}
				</p>
			</Nav>
		</StyledHeader>
	)
}
