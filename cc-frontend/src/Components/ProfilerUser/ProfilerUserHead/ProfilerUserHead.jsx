import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import styles from './ProfilerUserHead.module.css'
import profilImg from '../../../Images/designderimg.png'
import award from '../../../Images/award.png'
import follwerIMG from '../../../Images/designderimg.png'



let data = [
    {
        imgg: follwerIMG,
        name: "Robert Downey",
        flag: true,
    },
    {
        imgg: follwerIMG,
        name: "Robert Downey",
        flag: false,
    },
    {
        imgg: follwerIMG,
        name: "Robert Downey",
        flag: true,
    },
    {
        imgg: follwerIMG,
        name: "Robert Downey",
        flag: false,
    },
    {
        imgg: follwerIMG,
        name: "Robert Downey",
        flag: false,
    },
]


const ProfilerUserHead = () => {
    return (
        <>
            <div className={styles.proflerMain}>
                <div className={styles.DesigaREA}>
                    <div className={styles.nameButton}>
                        <div className={styles.designerName}>Robert Downey</div>
                        <button className={styles.editButon}>Edit Profile</button>
                    </div>
                    <BiDotsHorizontalRounded className={styles.dots} />
                </div>
                <div className={styles.infoArea}>
                    <div className={styles.imagesArea}>
                        <div className={styles.imagesOuter}><img src={profilImg} className={styles.profilImg} alt="" /></div>
                        <div className={styles.profileNmae}>Robert Downey</div>
                        <div className={styles.profilTextDeatail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                    <div className={styles.acountDetail}>
                        <div className={styles.postDetail}>
                            <div className={styles.posts}>
                                <div className={styles.postsNumber}>23</div>
                                <div className={styles.postsText}>Posts</div>
                            </div>
                            <div className={styles.posts}>
                                <div className={styles.postsNumber}>23</div>
                                <div className={styles.postsText}>Followers</div>
                            </div>
                            <div className={styles.posts}>
                                <div className={styles.postsNumber}>23</div>
                                <div className={styles.postsText}>Following</div>
                            </div>
                            <div className={styles.posts}>
                                <div className={styles.postsNumber}>23</div>
                                <div className={styles.postsText}>Likes</div>
                            </div>
                        </div>
                        <div className={styles.awardArea}>
                            <img src={award} className={styles.awardImg} alt="" />
                            <div className={styles.awardText}>Designer of the Month: March</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilerUserHead
