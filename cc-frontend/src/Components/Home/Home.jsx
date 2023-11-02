import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'
import Navbar2 from '../Navbar2/Navbar2'
import HomeHeader from './HomeHeader/HomeHeader'
import HomeSlider1 from './HomeSlider1/HomeSlider1'
import HomeBottom from './HomeBottom/HomeBottom'
import Footer from '../Footer/Footer'
import StoriesSlider from './StoriesSlider/StoriesSlider'

const Home = () => {
  const [user, setUser] = useState()
  const [allUsers, setAllUsers] = useState()
  const [trendingPosts, setTrendingPosts] = useState()
  const [designOfDay, setDesignOfDay] = useState()
  const [designOfMonth, setDesignOfMonth] = useState()
  const [designOfYear, setDesignOfYear] = useState()
  const [mostLiked, setMostLiked] = useState()
  let tempUser = {}
  
  
  console.log(designOfDay)
  
  return (
    <>
      <div className={styles.homeMian}>
        <Navbar2 />
        <StoriesSlider user={user} />
        <HomeHeader
          allUsers={allUsers}
          
        />
        <HomeBottom 
          // mostLiked={mostLiked} 
        />
        <Footer/>
      </div>
    </>
  )
}

export default Home
