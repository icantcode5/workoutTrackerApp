import { useNavigate, useParams } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Workout } from "../components/Workout"
//redux components
import { useDispatch, useSelector } from "react-redux"
//prettier-ignore
import {getWorkouts,deleteWorkout, getWorkoutsByDate, reset} from "../features/workouts/workoutsSlice"
import { removeUserData } from "../features/auth/authSlice"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import styles from "../components/styles/ViewWorkouts.module.css"

// Uninstall calendar from our dependencies!!!!

export function ViewWorkouts() {
	//when the user goes back to the view workouts page, the calendar shows the date they chose but the workouts aren't being shown any more. This is because the workouts by date are only retrieved when the date changes, so if we want the workouts to be shown when the user goes back, we have to make a request based on if there is a date parameter in the URL i think instead of onChange???? THE SOLUTION WAS TO MAKE A GET REQUEST OF THE WORKOUTS BY DATE IF THERE IS A DATE IN THE URL PARAMETER ALONG WITH PUTTING IT INSIDE OF A USEEFFECT THAT WAY THE WORKOUTS BY DATE LOAD ON HITTING THE BACK BUTTON AS USEEFFECT RUNS ONCE ON COMPONENT LOAD AND DEP. ARRAY VALUES CHANGING.
	const navigate = useNavigate()
	const { date } = useParams()
	const [calendarDate, setCalendarDate] = useState(date)

	const dispatch = useDispatch()

	const { userData } = useSelector((state) => state.auth)
	const { workouts, isLoading, isError, message } = useSelector((state) => {
		return state.workouts
	})

	//Capitalize First letter of first and last name. Will probably move this to happen elsewhere
	//prettier-ignore
	const name = userData.name.split(" ").map((el) => {
			return el[0].toUpperCase() + el.substring(1).toLowerCase()
		}).join(" ")

	useEffect(() => {
		if (calendarDate) {
			navigate(`/viewWorkouts/${calendarDate}`)
			dispatch(getWorkoutsByDate(calendarDate))
		} else {
			navigate("/viewWorkouts")
			dispatch(getWorkouts())
		}

		if (isError) {
			console.log(message)
		}

		dispatch(reset()) // isSuccess state persists even when we call the dispatch function #bug
	}, [dispatch, navigate, isError, message, calendarDate])

	const handleDelete = (id) => {
		dispatch(deleteWorkout(id))
	}

	const logoutHandler = () => {
		//because we couldn't navigate to the login page without also destroying the userData's state (indicating they are logged out), I had to create a reducer to to change the userData's state to null as well as destroying the user's data from local storage which allowed the user to successfully redirect to the "/login" page in logout button click
		localStorage.removeItem("user")
		dispatch(removeUserData())
		navigate("/login")
	}

	if (isLoading) {
		return <Spinner />
	}

	//Change the current date's state to trigger useEffect to load new workouts based on new date picked
	const handleDate = async (event) => {
		const { value } = event.target
		setCalendarDate(value)
	}

	const currentWorkouts = workouts.map((workout, i) => {
		return (
			<Workout
				key={workout._id}
				title={workout.title}
				created={workout.created}
				exercise={workout.exercise}
				sets={workout.sets}
				reps={workout.reps}
				lbs={workout.lbs}
				workoutId={workout._id}
				handleDelete={handleDelete}
			/>
		)
	})

	return (
		<>
			<header className={styles.header}>
				<h1>Hello, {name}, here are your personally logged workouts</h1>
				<ul>
					<li>
						<Link to="/login" onClick={logoutHandler}>
							<FaSignOutAlt /> Logout
						</Link>
					</li>
				</ul>
			</header>

			<section className={styles.mainBtnContainer}>
				<Link to="/">
					<button>Go to Home Page</button>
				</Link>

				<form placeholder="View by Date">
					<label htmlFor="viewByDate">View By Date</label>
					<input
						value={calendarDate}
						type="date"
						name="date"
						id="viewByDate"
						onChange={handleDate}
					/>
				</form>

				<Link to="/addWorkout">
					<button className={styles.addworkout}>
						Add a Workout <span>+</span>
					</button>
				</Link>
			</section>

			<div className={styles.workoutsFlex}>
				{workouts.length ? (
					currentWorkouts
				) : (
					<h2 className={styles.noWorkouts}>
						Add a workout to start tracking!
					</h2>
				)}
			</div>
		</>
	)
}
