import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import card1 from "../../../Images/homecard1.png";
import card2 from "../../../Images/homecard2.png";
import styles from "./HomeSlider2.module.css";
import store from "../../../store";
import { getAllPosts } from "../../../actions/posts";
import propTypes from "prop-types";
import { connect } from "react-redux";
/* 
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
]; */
const HomeSlider2 = ({ posts: { loading, posts } }) => {
  const [randomPosts, setRandomPosts] = useState();

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
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    store.dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (posts?.length > 0) {
      const shuffledArray = shuffleArray([...posts]);

      const selectedObjects = shuffledArray.slice(0, 10);
      setRandomPosts(selectedObjects);
    }
  }, [posts]);
  console.log(randomPosts);
  return (
    <div className={styles.slidersOuter}>
      <div className={styles.modelsArea}>
        <div className={styles.modelsHead}>Recommended for you </div>
        <div className={styles.viewText}>View all</div>
      </div>
      <Slider {...settings} className={styles.slidsWid}>
        {randomPosts?.map((item, index) => {
          return (
            <div className={styles.slideCrad}>
              <div
                className={item.flag ? styles.coloredArea : styles.coloredArea2}
              >
                {item?.image?.map((img, index) => (
                  <img
                    src={img}
                    className={`${
                      item.image.length === 1
                        ? styles.productimg_singleImg
                        : styles.productimg
                    }`}
                    alt=""
                    style={{
                      borderRadius:
                        index === 0 && item?.image.length > 1
                          ? "14px 14px 0 0"
                          : index === item?.image.length - 1 &&
                            item?.image.length > 1
                          ? "0 0 14px 14px"
                          : item?.image.length === 1
                          ? "14px"
                          : "0px",
                    }}
                  />
                ))}

                {/*  <div className={styles.cardsText}>{item.title}</div> */}
              </div>
              <div className={styles.robertDes}>{item.userName}</div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

HomeSlider2.propTypes = {
  /*   followUser: propTypes.func.isRequired, */
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, null)(HomeSlider2);
