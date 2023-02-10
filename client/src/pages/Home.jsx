import React from "react"
import {Link} from 'react-router-dom'
import { Footer } from "../components/Footer"
import image1 from "../assets/workoutImage1.jpg"
import image2 from "../assets/workoutImage2.jpg"
import image3 from "../assets/workoutImage3.jpg"
import styles from "../components/styles/Home.module.css"
import {HomeHeader} from "../components/HomeHeader.js"


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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reprehenderit corporis deleniti nemo facilis rem, inventore recusandae eligendi obcaecati accusamus itaque saepe dolorum aliquam omnis voluptate exercitationem hic id quo.
      </section>

    </main>
    </div>
  )
}