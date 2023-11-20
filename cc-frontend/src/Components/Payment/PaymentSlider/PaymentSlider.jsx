import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import styles from "./PaymentSlider.module.css";
import store from "../../../store";
import { getAllPosts } from "../../../actions/posts";
import propTypes from "prop-types";
import { connect } from "react-redux";
const PaymentSlider = ({ posts: { loading, posts } }) => {
  console.log(posts);
  const [randomPosts, setRandomPosts] = useState();

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
  return (
    <div className={styles.slidesMian}>
      <div className={styles.designText}>We think you might like these</div>
      <Slider {...settings} className={styles.slidesArea}>
        {randomPosts?.map((item) => (
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
};

PaymentSlider.propTypes = {
  /*   followUser: propTypes.func.isRequired, */
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, null)(PaymentSlider);
