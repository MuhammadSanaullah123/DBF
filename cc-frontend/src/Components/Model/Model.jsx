import React from 'react'
import styles from './Model.module.css'
import Navbar2 from '../Navbar2/Navbar2'
import productImg from '../../Images/feedProductImg1.png'
import userImg from '../../Images/designderimg.png'
import { BiHeart } from 'react-icons/bi';
import { AiTwotoneMessage } from 'react-icons/ai';
import { BsFillShareFill } from 'react-icons/bs';
import { GrStar } from 'react-icons/gr';
import centerImg from '../../Images/HomebottomImg.png'
import Footer from '../Footer/Footer'
import StoriesSlider from '../Home/StoriesSlider/StoriesSlider'



let data = [
    {
        userImg:userImg,
        userName:"Alexa lawrence",
        productImg:productImg,
        modelNmae:"Robert Downy"
    },
    {
        userImg:userImg,
        userName:"Robert Downey",
        productImg:productImg,
        modelNmae:"Robert Downy"
    },
]


let data2 = [
    {
        userImg:userImg,
        userName:"Alexa lawrence",
        productImg:productImg,
        modelNmae:"Robert Downy"
    },
 
]


const Model = () => {
  return (
    <>
      <div className={styles.feedOuter}>
        <Navbar2/>
        <StoriesSlider/>
        <div className={styles.postsArea}>
        {data.map((item) => (
            <div className={styles.postCard}>
                <div className={styles.postCardInner}>
                <div className={styles.userinfo}>
                    <div className={styles.imgBack}> <img src={item.userImg} className={styles.userImg} alt="" /></div>
                   <div className={styles.userNmae}>{item.userName}</div>
                </div>
                <div className={styles.productArea}>
                    <img src={item.productImg} className={styles.productimg} alt="" />
                    <div className={styles.produvtdetail}>
                        <div className={styles.sizesArea}>
                            <div className={styles.sizeHeading}>Available Sizes</div>
                            <div className={styles.sizesNAMES}><span>S</span><span>M</span><span>L</span><span>XL</span></div>
                        </div>
                        <div className={styles.designernmae}>{item.modelNmae}</div>
                    </div>
                </div>
                <div className={styles.feedBackArea2}>
                    <div className={styles.desihnNAME}>Waves Design</div>
                    <div className={styles.marker}>#Mark JR.</div>
                </div>
                <div className={styles.feedBackArea}>
                    <div className={styles.expressArea}>
                        <div className={styles.iconsArea}>
                        <BiHeart className={styles.heaert}/>
                        <AiTwotoneMessage className={styles.notiIcon}/>
                        <BsFillShareFill className={styles.shareIcon}/>
                        </div>
                        <div className={styles.starsArea}>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startwhite}/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        <div className={styles.centerImage}>
            <img src={centerImg} className={styles.centImage} alt="" />
        </div>
        <div className={styles.postsArea2}>
        {data2.map((item) => (
            <div className={styles.postCard}>
                <div className={styles.postCardInner}>
                <div className={styles.userinfo}>
                    <div className={styles.imgBack}> <img src={item.userImg} className={styles.userImg} alt="" /></div>
                   <div className={styles.userNmae}>{item.userName}</div>
                </div>
                <div className={styles.productArea}>
                    <img src={item.productImg} className={styles.productimg} alt="" />
                    <div className={styles.produvtdetail}>
                        <div className={styles.sizesArea}>
                            <div className={styles.sizeHeading}>Available Sizes</div>
                            <div className={styles.sizesNAMES}><span>S</span><span>M</span><span>L</span><span>XL</span></div>
                        </div>
                        <div className={styles.designernmae}>{item.modelNmae}</div>
                    </div>
                </div>
                <div className={styles.feedBackArea2}>
                    <div className={styles.desihnNAME}>Waves Design</div>
                    <div className={styles.marker}>#Mark JR.</div>
                </div>
                <div className={styles.feedBackArea}>
                    <div className={styles.expressArea}>
                        <div className={styles.iconsArea}>
                        <BiHeart className={styles.heaert}/>
                        <AiTwotoneMessage className={styles.notiIcon}/>
                        <BsFillShareFill className={styles.shareIcon}/>
                        </div>
                        <div className={styles.starsArea}>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startwhite}/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Model
