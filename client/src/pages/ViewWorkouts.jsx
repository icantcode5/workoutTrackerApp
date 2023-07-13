import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { Link } from "react-router-dom"
import { Workout } from "../components/Workout"
import { toast } from "react-toastify"
//redux components
import { useDispatch, useSelector } from "react-redux"
//prettier-ignore
import {getWorkouts,deleteWorkout, getWorkoutsByDate, reset} from "../features/workouts/workoutsSlice"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import styles from "../components/styles/ViewWorkouts.module.css"
import { logout } from "../features/auth/authSlice"

export function ViewWorkouts() {
	//when the user goes back to the view workouts page, the calendar shows the date they chose but the workouts aren't being shown any more. This is because the workouts by date are only retrieved when the date changes, so if we want the workouts to be shown when the user goes back, we have to make a request based on if there is a date parameter in the URL i think instead of onChange???? THE SOLUTION WAS TO MAKE A GET REQUEST OF THE WORKOUTS BY DATE IF THERE IS A DATE IN THE URL PARAMETER ALONG WITH PUTTING IT INSIDE OF A USEEFFECT THAT WAY THE WORKOUTS BY DATE LOAD ON HITTING THE BACK BUTTON AS USEEFFECT RUNS ONCE ON COMPONENT LOAD AND DEP. ARRAY VALUES CHANGING.
	// const location = useLocation()
	const navigate = useNavigate()
	const { date } = useParams()
	const dispatch = useDispatch()
	const [calendarDate, setCalendarDate] = useState(date)

	const { workouts, isLoading, isError } = useSelector((state) => {
		return state.workouts
	})

	useEffect(() => {
		if (calendarDate) {
			navigate(`/viewWorkouts/${calendarDate}`)
			dispatch(getWorkoutsByDate(calendarDate))
		} else {
			navigate("/viewWorkouts")
			dispatch(getWorkouts())
		}

		if (isError) {
			toast.error("Please login again, session has timed out.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})

			// dispatch(logout())
			// navigate("/login")
		}

		dispatch(reset()) // isSuccess state persists even when we call the dispatch function #bug
	}, [dispatch, navigate, isError, calendarDate])

	const handleDelete = (id) => {
		dispatch(deleteWorkout(id))
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
			<Header />

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
