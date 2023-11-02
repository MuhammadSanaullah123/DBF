import React, { Component } from "react";
import Slider from "react-slick";
import styles from './PaymentSlider.module.css'





const PaymentSlider = ({ posts }) => {
    
        console.log(posts)
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
                <div className={styles.designText}>We think you might like these</div>
                <Slider {...settings} className={styles.slidesArea}>
                    {posts?.map((item) => (
                        <div className={styles.slidesCard}>
                            <div className={styles.iamgArea}>
                                <img src={item.image} className={styles.cardsImg} alt="" />
                                <div className={styles.designersNmae}>{item.username}</div>
                            </div>
                            <div className={styles.productName}>{item.title}</div>
                            <div className={styles.productPrice}>${item.price}</div>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    
}
export default PaymentSlider