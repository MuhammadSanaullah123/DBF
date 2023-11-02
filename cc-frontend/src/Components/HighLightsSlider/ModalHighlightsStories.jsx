import React, { useState, useEffect } from "react";
// React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./HighLightsSlider.css";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
// API
import { addHighlight } from "../../actions/highlight";
//redux
import store from "../../store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";

const ModalHighlightsStories = ({
  addHighlight,
  highlightSelected,
  show,
  handleClose,
  handleDelete,
}) => {
  console.log(highlightSelected?.stories.length);
  console.log(highlightSelected);

  const [highlight, setHighlight] = useState({
    name: "",
    coverPhoto: "",
  });

  const onSubmit = async () => {
    const data = new FormData();

    data.append("file", highlight.coverPhoto);
    data.append("upload_preset", "u928wexc");
    data.append("cloud_name", "dihkvficg");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dihkvficg/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const resData = await res.json();

    const tempResponseObject = {
      name: highlight.name,
      coverPhoto: resData.url,
    };

    setHighlight({ ...highlight, coverPhoto: resData.url });

    console.log(highlight);
    // API
    addHighlight(tempResponseObject);

    handleClose();

    window.location.reload();
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{highlightSelected?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {highlightSelected?.stories.length > 0 ? (
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
          >
            {highlightSelected?.stories.map((highlight) => {
              return (
                <SwiperSlide>
                  <>
                    <div className={styles.slidCrad}>
                      <div className={styles.imgArea}>
                        <img
                          src={highlight.image}
                          className={styles.cardSimg}
                          alt=""
                        />
                      </div>
                      <div className={styles.storieName}>{highlight.text}</div>
                    </div>
                  </>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <p style={{ color: "red", textAlign: "center", fontWeight: 600 }}>
            There is no story added to this highlight
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{
            width: "100px",
            height: "40px",
            background: "#d9534f",
            borderRadius: "8px",
            color: "#fff",
            border: "0",
            cursor: "pointer",
          }}
          onClick={() => {
            handleDelete(highlightSelected._id);
            handleClose();
          }}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

ModalHighlightsStories.propTypes = {
  addHighlight: propTypes.func.isRequired,
};

export default connect(null, { addHighlight })(ModalHighlightsStories);
