import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
// API
import { getReviews } from "../../actions/posts";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";
// Swal
import Swal from "sweetalert2";

const Model = ({
  currentPost,
  show,
  handleClose,

  auth: { user },
}) => {
  const [reviews, setReviews] = useState();
  const handleReview = async () => {
    console.log("INSDEI");
    console.log(currentPost.post);
    try {
      const res = await store.dispatch(getReviews(currentPost.post));
      console.log(res.data); // Assuming that reviews are in res.data
      setReviews(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleReview();
  }, [currentPost?.post]);
  console.log(currentPost);
  console.log(reviews);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
              {reviews?.map((review, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={review.image}
                    alt=""
                    style={{
                      height: "250px",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

Model.propTypes = {
  getReviews: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { getReviews })(Model);
