import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import card1 from "../../../Images/homecard1.png";
import card2 from "../../../Images/homecard2.png";
import styles from "./HomeSlider1.module.css";
//redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";
//API
import { getTopModels } from "../../../actions/posts";

const HomeSlider1 = ({ auth: { loading, user }, posts: { models } }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: models?.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 3500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 1,
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

  useEffect(() => {
    store.dispatch(getTopModels());
    console.log("models", models);
  }, [store]);

  return (
    <>
      {user !== null && (
        <div className={styles.slidersOuter}>
          <div className={styles.modelsArea}>
            <div className={styles.modelsHead}>Most Liked Models</div>
            <div className={styles.viewText}>View all</div>
          </div>
          <Slider {...settings} className={styles.slidsWid}>
            {models?.map((item) => (
              <a
                href={`/product/${item?._id}`}
                style={{ textAlign: "-webkit-center" }}
              >
                <div className={styles.slideCrad}>
                  <div className={styles.coloredArea}>
                    <img src={item?.image} className={styles.cardsImg} alt="" />
                  </div>
                  {/* <div className={styles.robertDes}>{item?.firstName + " " + item?.lastName}</div> */}
                </div>
              </a>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  posts: state.posts,
  models: state.models,
});

export default connect(mapStateToProps, null)(HomeSlider1);
