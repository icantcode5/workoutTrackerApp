import './App.css';
import { Link, Routes, Route } from "react-router-dom"
import { AddWorkout } from './pages/AddWorkout';
import { Home } from './pages/Home'
import { ViewWorkouts } from './pages/ViewWorkouts';

function App() {

  return (
    <>
    <Routes>
      <Route path = '/addWorkout' element = {<AddWorkout />}/>
      <Route path = "/home" element ={<Home />}/>
      <Route path ="/viewWorkouts" element ={<ViewWorkouts />}/>
    </Routes>
    </>
  );  
}

export default App;
