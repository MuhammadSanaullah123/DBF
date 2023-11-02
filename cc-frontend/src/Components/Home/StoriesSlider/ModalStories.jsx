import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
// React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./StoriesSlider.module.css";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
// API
import { addStoryToHighlight } from "../../../actions/highlight";
// Redux
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";

const ModalStories = ({
  story,
  show,
  handleClose,
  auth: { loading, user },
  addStoryToHighlight,
}) => {
  console.log(story);
  const [dropdownValue, setDropdownValue] = useState("");
  const [options, setOptions] = useState();
  const [highlights, setHighlights] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  // Dropdown

  let tempHighlights = [];
  // let tempOptions = []

  // useEffect(() => {
  // if (user?.highlights) {
  //     const tempOptions = user?.highlights.map((highlight) => highlight.name)
  //     setOptions(tempOptions)
  //     console.log(tempOptions)
  //     // setOptions(tempOptions)
  //     // console.log("options", options)
  //   }
  // }, []);

  const handleDropdownValue = (selectedHighlight) => {
    setDropdownValue(selectedHighlight.selectedHighlight.value);

    console.log(selectedHighlight);
    const targetObj = user?.highlights.find(
      (item) => item.name === selectedHighlight.selectedHighlight.value
    );

    if (targetObj) {
      const highlightId = targetObj._id;
      const storyId = selectedHighlight.storyId;

      addStoryToHighlight({ highlightId, storyId });
      handleClose();
    }
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Swiper
            slidesPerView={1}
            breakpoints={{
              340: {
                slidesPerView: 1,
              },
              440: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            onSlideChange={(swiper) => setCurrentStoryIndex(swiper.activeIndex)}
          >
            {story
              ?.filter((story) => {
                const createdAt = new Date(story?.createdAt);
                const now = new Date();
                // Calculate the time difference in milliseconds
                const timeDifference = now - createdAt;
                // Convert 24 hours to milliseconds
                const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
                // Return true if the story was created in the last 24 hours
                return timeDifference <= twentyFourHoursInMilliseconds;
              })

              ?.map((story) => {
                console.log(story);
                return (
                  <SwiperSlide key={story?._id}>
                    <div>
                      <div
                        style={{
                          fontSize: "25px",
                          textAlign: "left",
                          paddingBottom: "20px",
                        }}
                      >
                        {story?.text}
                      </div>
                      <img
                        src={story?.image}
                        style={{ width: "100%", height: "250px" }}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            <div className={styles.dropdownWrapper}>
              <Dropdown
                /*   options={["highlight # 1", "highlight # 2"]} */
                options={user?.highlights?.map((item) => item.name)}
                onChange={(selectedHighlight) =>
                  handleDropdownValue({
                    selectedHighlight,
                    storyId: story[currentStoryIndex]._id,
                  })
                }
                value={dropdownValue}
                placeholder="Add to Highlight"
              />
            </div>
          </Swiper>
        </>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

ModalStories.propTypes = {
  addStoryToHighlight: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { addStoryToHighlight })(ModalStories);
