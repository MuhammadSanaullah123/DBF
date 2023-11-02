import React from "react";
import { Link } from "react-router-dom"
import Slider from "react-slick";
import styles from './LikedSlider.module.css'
import cardsImg from '../../../Images/feedProductImg1.png'
import { BiHeart } from 'react-icons/bi';
import { AiTwotoneMessage, AiFillHeart } from 'react-icons/ai';
import { BsFillShareFill } from 'react-icons/bs';
import { addLike } from "../../../API/post"

const LikedSlider = ({ likedPosts }) => {
    let tempLike;

    const toggleLike = async (id) => {
        
        await addLike(id,
            (res) => {
                tempLike = res
                console.log(res)
            },
            (error) => {
                console.log(error)
            }
        )
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 3,
                }
            },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                    breakpoint: 440,
                    settings: {
                      slidesToShow: 1,
                    }
                }
            ]
        };
        return (
            <div className={styles.slidesMian}>
                <div className={styles.designText}> Customers Also Liked</div>
                <Slider {...settings} className={styles.slidesArea}>
                    {likedPosts?.map((item) => {
                        return(
                            <div className={styles.slidesCard}>
                                <div className={styles.iamgArea}>
                                    <Link to={`/product/${item._id}`}>
                                    <img src={item.image} className={styles.cardsImg} alt="" />
                                    <div className={styles.designersNmae}>{item.userName}</div>
                                    </Link>
                                </div>
                                <div className={styles.iconsArea}>
                                    {(item?.likes.filter(e => e._id === `${item.postedBy}`).length > 0)
                                    ? 
                                        <AiFillHeart style={{color:'#00E5BE', fontSize:'20px'}} /> 
                                    :
                                        <BiHeart className={styles.heaert} onClick={() => toggleLike(item._id)}/>
                                    }
                                    <AiTwotoneMessage className={styles.notiIcon}/>
                                    <BsFillShareFill className={styles.shareIcon}/>
                                </div>
                                <div className={styles.productName}>{item.title}</div>
                                <div className={styles.productPrice}>${item.price}</div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
    
}

export default LikedSlider