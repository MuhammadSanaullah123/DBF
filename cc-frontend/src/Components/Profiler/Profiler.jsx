import React from 'react'
// CSS
import styles from './Profiler.module.css'
// Components
import DBFNavbar from '../Navbar2/Navbar2'
import ProfilerHead from './ProfilerHead/ProfilerHead'
import Profilerbotom from './Profilerbottom/Profilerbotom'
import Footer from '../Footer/Footer'
import HighLightsSlider from '../HighLightsSlider/HighLightsSlider'

const Profiler = () => {

  return (
    <>
      <div className={styles.profilerOuter}>
        <DBFNavbar />
        <ProfilerHead />
        <HighLightsSlider/>
        <Profilerbotom />
        <Footer/>
      </div>
    </>
  )
}

export default Profiler
