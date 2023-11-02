import React, { useState, useEffect } from "react";
// React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
// API
import { addStory } from "../../../actions/story";
//redux
import store from "../../../store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";

const ModalStory = ({ addStory, showStory, handleCloseStory }) => {
  const [story, setStory] = useState({
    text: "",
    image: "",
  });

  const onSubmit = async () => {
    const data = new FormData();

    data.append("file", story.image);
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
      text: story.text,
      image: resData.url,
    };

    setStory({ ...story, image: resData.url });

    console.log(story);
    // API
    addStory(tempResponseObject);

    handleCloseStory();
  };

  console.log(story);
  return (
    <Modal
      show={showStory}
      onHide={handleCloseStory}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupUpload">
            <Form.Label style={{ fontSize: "20px", color: "#00E5BE" }}>
              Upload File
            </Form.Label>
            <input
              id="file-uploader"
              style={{ display: "block" }}
              type="file"
              onChange={(e) => setStory({ ...story, image: e.target.files[0] })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label style={{ fontSize: "20px", color: "#00E5BE" }}>
              Enter Caption
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Caption"
              onChange={(e) => setStory({ ...story, text: e.target.value })}
            />
          </Form.Group>
        </Form>
        <Button
          style={{ background: "#00E5BE", border: "#00E5BE" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
};

ModalStory.propTypes = {
  addStory: propTypes.func.isRequired,
};

export default connect(null, { addStory })(ModalStory);
