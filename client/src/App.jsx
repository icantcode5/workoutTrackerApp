import {useState, useEffect} from "react"
import axios from "axios";
import {  Routes, Route } from "react-router-dom"
import { AddWorkout } from './pages/AddWorkout';
import { Home } from './pages/Home'
import { ViewWorkouts } from './pages/ViewWorkouts';
import { EditWorkout } from './pages/EditWorkout'
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import styles from "./App.module.css"
import {ToastContainer} from "react-toastify"

function App() {

  //brough up state to share with children one level down
  const [workouts, setWorkouts] = useState([])
  const [loggedIn, setLoggedIn] = useState(false) // this didnt work, I think the dipatch method is taking longer than the useEffect in our Login component

  useEffect(() => {
    if(localStorage.getItem("user")){
      let token = JSON.parse(localStorage.getItem("user")).token
      axios.get("http://localhost:5000/workout/viewWorkouts",{
      headers : {
      authorization : token
    } 
   })
   .then(response =>{
    setWorkouts(response.data)
    setLoggedIn(true)
   })
   .catch(err =>{
    console.log(err)
   })
  }
  },[loggedIn])

  return (
    <>
    <Routes>
      <Route path = "/register" element = {<Register />} />
      <Route path = "/login"  element = {<Login loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} />}/>
      <Route path = '/addWorkout' element = {<AddWorkout workouts={workouts} setWorkouts = {setWorkouts}/>}/>
      <Route path = "/" element ={<Home />}/>
      <Route path ="/viewWorkouts" element ={<ViewWorkouts workouts = {workouts} setWorkouts = {setWorkouts}/>}/>
      <Route path ="/editWorkout/:id" element ={<EditWorkout workouts = {workouts} setWorkouts = {setWorkouts}/>}/>
    </Routes>
    <ToastContainer />
    </>
  );  
}

export default App;
