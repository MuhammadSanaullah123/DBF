import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
import styles from "./HighLightsSlider.module.css";
import "./HighLightsSlider.css";
import cardImg from "../../Images/designderimg.png";
//redux
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";
// API
import { getUserById } from "../../actions/user";
import { deleteHighlight, getHighlights } from "../../actions/highlight";
// Components
import ModalHighlights from "./ModalHighlights";
import ModalHighlightsStories from "./ModalHighlightsStories";

const HighLightsSlider = ({
  deleteHighlight,
  getHighlights,
  auth: { loading, user },
  user: { users },
}) => {
  const [showHighlights, setShowHighlights] = useState(false);
  const [showHighlightsStories, setShowHighlightsStories] = useState(false);

  const [tempHighlight, setTempHighlight] = useState();

  const handleCloseHighlights = () => setShowHighlights(false);
  const handleShowHighlights = () => setShowHighlights(true);

  const handleCloseHighlightsStories = () => setShowHighlightsStories(false);
  const handleShowHighlightsStories = () => setShowHighlightsStories(true);

  const handleDelete = (id) => {
    console.log(id);
    deleteHighlight(id);
  };

  const url = window.location.href;
  const id = url.split("/").pop();

  useEffect(() => {
    if (id != "me") store.dispatch(getUserById(id));
  }, []);
  useEffect(() => {
    getHighlights();
  }, []);

  return (
    <>
      <div className={styles.slidersMain}>
        <div className={styles.titleS}>Highlights</div>
        <ModalHighlights
          show={showHighlights}
          handleClose={handleCloseHighlights}
        />
        <ModalHighlightsStories
          show={showHighlightsStories}
          handleClose={handleCloseHighlightsStories}
          highlightSelected={tempHighlight}
          handleDelete={handleDelete}
        />
        <Swiper
          slidesPerView={7}
          breakpoints={{
            340: {
              slidesPerView: 2,
            },
            440: {
              slidesPerView: 15,
            },

            768: {
              slidesPerView: 1,
            },
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <div className={styles.wrapperHighlights}>
            {loading ? (
              <div style={{ width: "100vw", textAlign: "center" }}>
                <RotatingLines
                  strokeColor="#00e5be"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="64"
                  visible={true}
                />
              </div>
            ) : id == "me" ? (
              user?.highlights?.length > 0 ? (
                <>
                  <SwiperSlide className={styles.slidesOuter}>
                    {user?.highlights?.map((item) => {
                      return (
                        <>
                          <div
                            className={styles.slidCrad}
                            onClick={() => {
                              setShowHighlightsStories(!showHighlightsStories);
                              setTempHighlight(item);
                            }}
                          >
                            <div className={styles.imgArea}>
                              <img
                                src={item.coverPhoto}
                                className={styles.cardSimg}
                                alt=""
                              />
                            </div>
                            <div className={styles.storieName}>{item.name}</div>
                          </div>
                        </>
                      );
                    })}
                    <div
                      className={styles.greenCircleAdd}
                      onClick={() => {
                        setShowHighlights(!showHighlights);
                      }}
                    >
                      +
                    </div>
                  </SwiperSlide>
                </>
              ) : (
                <div
                  className={styles.greenCircleAdd}
                  style={{ top: "0px" }}
                  onClick={() => {
                    setShowHighlights(!showHighlights);
                  }}
                >
                  +
                </div>
              )
            ) : users?.highlights?.length > 0 ? (
              <>
                <SwiperSlide className={styles.slidesOuter}>
                  {users?.highlights.map((item) => {
                    return (
                      <>
                        <div
                          className={styles.slidCrad}
                          onClick={() => {
                            setShowHighlightsStories(!showHighlightsStories);
                            setTempHighlight(item);
                          }}
                        >
                          <div className={styles.imgArea}>
                            <img
                              src={item.coverPhoto}
                              className={styles.cardSimg}
                              alt=""
                            />
                          </div>
                          <div className={styles.storieName}>{item.name}</div>
                        </div>
                      </>
                    );
                  })}
                </SwiperSlide>
              </>
            ) : null}
          </div>
        </Swiper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
HighLightsSlider.propTypes = {
  deleteHighlight: propTypes.func.isRequired,
  getHighlights: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteHighlight, getHighlights })(
  HighLightsSlider
);
