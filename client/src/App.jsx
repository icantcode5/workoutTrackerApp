import {  Routes, Route } from "react-router-dom"
import { AddWorkout } from './pages/AddWorkout';
import { Home } from './pages/Home'
import { ViewWorkouts } from './pages/ViewWorkouts';
import { EditWorkout } from './pages/EditWorkout'
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import styles from "./App.module.css"
//redux imports
import {ToastContainer} from "react-toastify"

function App() {
  
  return (
    <>
    <Routes>
      <Route path = "/register" element = {<Register />} />
      <Route path = "/login"  element = {<Login />}/>
      <Route path = '/addWorkout' element = {<AddWorkout />}/>
      <Route path = "/" element ={<Home />}/>
      <Route path ="/viewWorkouts" element ={<ViewWorkouts />}/>
      <Route path ="/editWorkout/:id" element ={<EditWorkout/>}/>
    </Routes>
    <ToastContainer />
    </>
  );  
}

export default App;
