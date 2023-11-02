import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
import styles from "./StoriesSlider.module.css";
import "./StoriesSlider.css";
// Assets
import cardImg from "../../../Images/designderimg.png";
// Components
import ModalStories from "./ModalStories";
// API
import { getUserByID } from "../../../API/auth";
import { getAllStories, getFriendsStory } from "../../../actions/story";
// Redux
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";
// import { getStories } from "../../../API/story"

const StoriesSlider = ({ auth: { loading, user }, stories: { stories } }) => {
  const [currentStory, setCurrentStory] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [storiesHook, setStoriesHook] = useState(null);

  useEffect(() => {
    if (user) {
      store.dispatch(getFriendsStory());
      console.log("stories", stories);
      setStoriesHook(stories);
    }
  }, [user]);

  console.log("STORUESSS");
  console.log(user);
  console.log(stories);
  return (
    <>
      <div className={styles.slidersMain}>
        <div className={styles.titleS}>Stories</div>
        <div style={{ display: "flex" }}>
          {user?.stories !== null &&
          stories !== null /*  &&
          typeof stories === "object"  */ ? (
            <>
              <div className={styles.slidersMain}>
                <div style={{ display: "flex", overflowX: "auto" }}>
                  {/* Logged in user stories */}

                  <div
                    className={styles.slidesOuter}
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                  >
                    {/* {stories[userId].map((item) => ( */}
                    <div className={styles.slidCrad}>
                      <img
                        src={user?.image}
                        onClick={() => {
                          setOpenModal(true);
                          setCurrentStory(user?.stories);
                        }}
                        className={styles.imgArea}
                        alt=""
                      />
                      <div
                        className={styles.user}
                        style={{ color: "white", marginTop: "15px" }}
                      >
                        {user?.stories[0]?.userName}
                      </div>
                    </div>
                  </div>

                  {/* Followed users stories */}
                  {Object.keys(stories).map((userId) => {
                    // Log the current userId for debugging
                    console.log("Current User ID:", userId);

                    return (
                      <div
                        className={styles.slidesOuter}
                        key={userId}
                        style={{ marginLeft: "15px", marginRight: "15px" }}
                      >
                        {/* {stories[userId].map((item) => ( */}
                        <div className={styles.slidCrad}>
                          <img
                            src={stories[userId][0]?.user?.image}
                            onClick={() => {
                              setOpenModal(true);
                              setCurrentStory(stories[userId]);
                            }}
                            className={styles.imgArea}
                            alt=""
                          />
                          <div
                            className={styles.user}
                            style={{ color: "white", marginTop: "15px" }}
                          >
                            {stories[userId][0]?.userName}
                          </div>
                        </div>
                        {/* ))} */}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.slidersMain}>
              <div style={{ color: "red" }}>No stories to display.</div>
            </div>
          )}
          <ModalStories
            story={currentStory}
            show={openModal}
            handleClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </>
  );
};

StoriesSlider.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  stories: state.stories,
});

export default connect(mapStateToProps, null)(StoriesSlider);
