import React from "react"
import {Link} from 'react-router-dom'
import { Footer } from "../components/Footer"
import image1 from "../assets/workoutImage1.jpg"
import image2 from "../assets/workoutImage2.jpg"
import image3 from "../assets/workoutImage3.jpg"
import styles from "../components/styles/Home.module.css"
import {HomeHeader} from "../components/HomeHeader.js"
import {GiBackwardTime} from "react-icons/gi"
import {GrUpdate} from "react-icons/gr"
import {MdOutlineFitnessCenter} from "react-icons/md"


export function Home(){

  return(
    <div className={styles.backgroundImage}>
    <HomeHeader />
    <main className={styles.main}>

      <div className={styles.imagesContainer}>
        <img src= {image1} alt ="girl working out" className={styles.imageOne}/>
        <div className={styles.imagesTwoThreeContainer}>
          <img src= {image2} alt ="back shot" className={styles.imageTwo}/>
          <img src= {image3} alt ="ropes" className={styles.imageThree}/>
        </div>
      </div>

      <section className={styles.section}>
        <h2>Never forget how much weight you lifted or how many reps you accomplished. Track it all now.</h2>
        <p>Easily Log your workouts, sets and reps</p>
        <p>Make any adjustments as you go with updating functionality</p>
        <p>Keep track of your past workouts for days, months and year to come</p>
      </section>

    </main>
    </div>
  )
}