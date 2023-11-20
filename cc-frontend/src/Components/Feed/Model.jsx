import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// API
import { addReview } from "../../actions/posts";
import { connect } from "react-redux";
import propTypes from "prop-types";

// Swal
import Swal from "sweetalert2";

const Model = ({
  currentPost,
  show,
  handleClose,

  auth: { user },
  addReview,
}) => {
  const [image, setImage] = useState();

  const onSubmit = async () => {
    const data = new FormData();
    data.append("file", image);
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
    const image_url = resData.url;

    addReview({
      rating: null,
      review: null, 
      image: image_url,
      id: currentPost._id,
      userid: user._id,
    });
    window.location.reload();
  };
  console.log(currentPost);
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
              {currentPost?.reviews.map((review, index) => (
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

            <Form.Label
              style={{
                fontSize: "20px",
                color: "#00E5BE",
                marginTop: "10px",
              }}
            >
              Upload File
            </Form.Label>
            <input
              id="file-uploader"
              style={{ display: "block" }}
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <Button
              style={{
                background: "#00E5BE",
                border: "#00E5BE",
                marginTop: "10px",
              }}
              onClick={() => onSubmit()}
            >
              Submit
            </Button>
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
  addReview: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { addReview })(Model);
