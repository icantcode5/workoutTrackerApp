import './App.css';
import {  Routes, Route } from "react-router-dom"
import { AddWorkout } from './pages/AddWorkout';
import { Home } from './pages/Home'
import { ViewWorkouts } from './pages/ViewWorkouts';
import { EditWorkout } from './pages/EditWorkout'

function App() {

  return (
    <>
    <Routes>
      <Route path = '/addWorkout' element = {<AddWorkout />}/>
      <Route path = "/home" element ={<Home />}/>
      <Route path ="/viewWorkouts" element ={<ViewWorkouts />}/>
      <Route path ="/editWorkout/:id" element ={<EditWorkout />}/>
    </Routes>
    </>
  );  
}

export default App;
