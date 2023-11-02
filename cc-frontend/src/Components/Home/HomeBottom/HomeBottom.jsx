import React from "react";
import styles from "./HomeBottom.module.css";
import HomeSlider1 from "../HomeSlider1/HomeSlider1";
import bottomimg from "../../../Images/HomebottomImg.png";
import HomeSlider2 from "../HomeSlider2/HomeSlider2";

const HomeBottom = ({ mostLiked }) => {
  return (
    <>
      <HomeSlider1 mostLiked={mostLiked} />
      <div className={styles.bottomImg}>
        <img src={bottomimg} className={styles.imgInner} alt="" />
      </div>
      <HomeSlider2 />
    </>
  );
};

export default HomeBottom;
