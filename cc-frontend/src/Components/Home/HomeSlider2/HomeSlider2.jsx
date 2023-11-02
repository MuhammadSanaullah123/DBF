import React, { Component } from "react";
import Slider from "react-slick";
import card1 from '../../../Images/homecard1.png'
import card2 from '../../../Images/homecard2.png'
import styles from './HomeSlider2.module.css'


let data = [
    {
        imgg: card1,
        text: "Robert Downey",
        flag: true,
    },
    {
        imgg: card2,
        text: "",
        flag: false,
    },
    {
        imgg: card1,
        text: "Robert Downey",
        flag: true,
    },
    {
        imgg: card1,
        text: "Robert Downey",
        flag: true,
    },
    {
        imgg: card2,
        text: "",
        flag: false,
    },
    {
        imgg: card1,
        text: "Robert Downey",
        flag: true,
    },
]



export default class HomeSlider2 extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 5,
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
            <div className={styles.slidersOuter}>
                <div className={styles.modelsArea}>
                    <div className={styles.modelsHead}>Recommended for you </div>
                    <div className={styles.viewText}>View all</div>
                </div>
                <Slider {...settings} className={styles.slidsWid}>
                    {data.map((item) => (
                        <div className={styles.slideCrad} >
                            <div className={item.flag ? styles.coloredArea : styles.coloredArea2}>
                                <img src={item.imgg} className={styles.cardsImg} alt="" />
                                <div className={styles.cardsText}>{item.text}</div>
                            </div>
                            <div className={styles.robertDes}>Robert Downey</div>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}