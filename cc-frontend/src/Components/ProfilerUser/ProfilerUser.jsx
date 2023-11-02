import React from 'react'
import styles from './ProfilerUser.module.css'
import ProfilerUserHead from './ProfilerUserHead/ProfilerUserHead'
import Profilerbotom from '../Profiler/Profilerbottom/Profilerbotom'
import Footer from '../Footer/Footer'
import HighLightsSlider from '../HighLightsSlider/HighLightsSlider'
import StoriesSlider from '../Home/StoriesSlider/StoriesSlider'



const ProfilerUser = () => {
    return (
        <>
            <div className={styles.userOuter}>
                <ProfilerUserHead />
<StoriesSlider/>
                <Profilerbotom/>
                <Footer/>
            </div>
        </>
    )
}

export default ProfilerUser
