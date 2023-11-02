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

const ModalHighlights = ({ addHighlight, show, handleClose }) => {
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
        <Modal.Title>Add New Highlight</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label style={{ fontSize: "20px", color: "#00E5BE" }}>
              Highlight Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setHighlight({ ...highlight, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupUpload">
            <Form.Label style={{ fontSize: "20px", color: "#00E5BE" }}>
              Upload File
            </Form.Label>
            <input
              id="file-uploader"
              style={{ display: "block" }}
              type="file"
              onChange={(e) =>
                setHighlight({ ...highlight, coverPhoto: e.target.files[0] })
              }
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

ModalHighlights.propTypes = {
  addHighlight: propTypes.func.isRequired,
};

export default connect(null, { addHighlight })(ModalHighlights);
