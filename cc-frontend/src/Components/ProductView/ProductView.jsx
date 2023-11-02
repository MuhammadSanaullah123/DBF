import React from 'react'
import styles from './ProductView.module.css'
import Navbar2 from '../Navbar2/Navbar2'
import designerImg from '../../Images/designderimg.png'
import paperimg from '../../Images/feedProductImg1.png'
import { GrStar } from 'react-icons/gr';
import DesignsSlider from './DesignsSlider/DesignsSlider'
import LikedSlider from './LikedSlider/LikedSlider'
import Footer from '../Footer/Footer'
import { Link } from "react-router-dom";


let data = [
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
    {
        specs:"Lorem ipsum dolor sit amet, consectetur"
    },
]




const ProductView = () => {
    return (
        <>
            <div className={styles.viewOuter}>
                <Navbar2 /> 
                <div className={styles.overViewArea}>
                    <div className={styles.overviewInner}>
                        <div className={styles.designerInfo}>
                            <div className={styles.designImageArea}>
                                <img src={designerImg} className={styles.designerImg} alt="" />
                            </div>
                            <div className={styles.designername}>Robert Downey</div>
                        </div>
                        <div className={styles.mainImagArea}>
                            <img src={paperimg} className={styles.paperimg} alt="" />
                            <div className={styles.robert}>Robert Downy</div>
                        </div>
                         <div className={styles.startsArea}>
                            <div className={styles.designName}>Waves Design</div>
                            <div className={styles.startsRight}>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startYellow}/>
                            <GrStar className={styles.startwhite}/>
                            <div className={styles.model}>Model</div>
                            </div>
                         </div>
                         <div className={styles.stockDetail}> 
                            <div className={styles.productPrice}>$23</div>
                            <div className={styles.stckNumbers}>Only 3 left in stock</div>
                            <div className={styles.availText}>Available Sizes</div>
                            <div className={styles.sizesdiv}>
                                <span>S</span>
                                <span>M</span>
                                <span>L</span>
                                <span>XL</span>
                                <span>xLL</span>
                            </div>
                         </div>
                    </div>
                </div>
                <div className={styles.specificationsArea}>
                    <div className={styles.buttonsArea}>
                        <button className={styles.overBuuton}>Overview</button>
                        <button className={styles.overBuuton2}>Specifications</button>
                    </div>
                    <div className={styles.listArea}>
                    {data.map((item,index) => (
                        <div className={index%2==0?styles.listspec1:styles.listspec}>
                            <div className={styles.dot}></div>
                            <div className={styles.specText}>{item.specs}</div>
                        </div> 
                        ))}
                    </div>
                </div>
                <DesignsSlider/>
                <LikedSlider/>
                <div className={styles.buyButtons}>
                <Link to="/checkout" className={styles.buyNoq}>Buy now</Link>
                <Link className={styles.add}>Add to Cart</Link>
                </div>
                <Footer/> 
            </div>
        </>
    )
}

export default ProductView
