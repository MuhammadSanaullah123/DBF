import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// React icons
import { GrStar } from "react-icons/gr";
import styles from "./ModalReview.module.css";
// API
import { addReview } from "../../actions/posts";
import { connect } from "react-redux";
import propTypes from "prop-types";
// Swal
import Swal from "sweetalert2";

const ModalReview = ({
  postID,
  show,
  handleClose,
  cart,
  addReview,
  auth: { user },
}) => {
  const [star, setStar] = useState();
  const [review, setReview] = useState();
  const [image, setImage] = useState();
  const [postid] = useState(postID);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [stars, setStars] = useState({});
  const [reviews, setReviews] = useState({});
  const [images, setImages] = useState({});

  const handleReviewChange = (itemId, reviewText) => {
    setReviews({
      ...reviews,
      [itemId]: reviewText,
    });
  };

  const handleImageUpload = (itemId, image) => {
    setImages({
      ...images,
      [itemId]: image,
    });
  };

  const handleRating = (itemId, rating) => {
    setStars({
      ...stars,
      [itemId]: rating,
    });
  };
  console.log(stars);
  console.log(reviews);
  console.log(images);

  const onSubmit = async () => {
    let image_arr = {};
    for (const itemId in images) {
      if (images.hasOwnProperty(itemId)) {
        const imageData = images[itemId];
        const data = new FormData();
        data.append("file", imageData);
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
        image_arr[itemId] = image_url;
      }
    }
    console.log(image_arr);
    for (const itemId in images) {
      if (images.hasOwnProperty(itemId)) {
        addReview({
          rating: stars[itemId],
          review: reviews[itemId],
          image: image_arr[itemId],
          id: itemId,
          userid: user._id,
        });
      }
    }
    handleClose();
  };

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
          <div>
            {cart?.length >= 1 ? (
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
                onSlideChange={(swiper) =>
                  setCurrentStoryIndex(swiper.activeIndex)
                }
              >
                {cart?.map((item) => {
                  console.log(item);
                  return (
                    <SwiperSlide key={item?.post._id}>
                      <div>
                        <div
                          style={{
                            fontSize: "25px",
                            textAlign: "left",
                            paddingBottom: "20px",
                          }}
                        >
                          {item?.post.title}
                        </div>
                        {item?.post.image.map((img, index) => (
                          <img
                            src={img}
                            key={index}
                            style={{ width: "100%", height: "150px" }}
                            alt=""
                          />
                        ))}
                        <div
                          style={{
                            textAlign: "start",
                            margin: "10px 0 10px 0",
                          }}
                        >
                          {Array.from({ length: 5 }, (_, index) => (
                            <GrStar
                              className={`${
                                index + 1 <= stars[item?.post._id]
                                  ? styles.staryellow
                                  : styles.starwhite
                              }`}
                              key={index}
                              onClick={(e) =>
                                handleRating(item?.post._id, index + 1)
                              }
                            />
                          ))}

                          <Form.Control
                            placeholder="Write review..."
                            className={styles.textarea}
                            as="textarea"
                            aria-label="With textarea"
                            value={reviews[item?.post._id]}
                            onChange={(e) =>
                              handleReviewChange(item?.post._id, e.target.value)
                            }
                          />

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
                            onChange={(e) =>
                              handleImageUpload(
                                item?.post._id,
                                e.target.files[0]
                              )
                            }
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
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
              </Swiper>
            ) : (
              <>
                {Array.from({ length: 5 }, (_, index) => (
                  <GrStar
                    className={`${
                      index + 1 <= stars[postID]
                        ? styles.staryellow
                        : styles.starwhite
                    }`}
                    key={index}
                    onClick={(e) => handleRating(postID, index + 1)}
                  />
                ))}

                <Form.Control
                  placeholder="Write review..."
                  className={styles.textarea}
                  as="textarea"
                  aria-label="With textarea"
                  value={reviews[postID]}
                  onChange={(e) => handleReviewChange(postID, e.target.value)}
                />

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
                  onChange={(e) => handleImageUpload(postID, e.target.files[0])}
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
              </>
            )}
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

ModalReview.propTypes = {
  addReview: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { addReview })(ModalReview);
