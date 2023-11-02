import React, { useState, useEffect } from "react";
// React dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
// CSS
import styles from "./ProfilerHead.module.css";
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
// Text Editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// API
import { addPost } from "../../../actions/posts";
//redux
import store from "../../../store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";

const ModalPost = ({ addPost, showPost, handleClosePost }) => {
  const [overviewTemp, setOverviewTemp] = useState();
  const [specificationTemp, setSpecificationTemp] = useState();

  const [post, setPost] = useState({
    title: "",
    image: [],
    tag: [],
    price: 0,
    quantity: 0,
    size: "S",
    overview: "",
    specification: "",
    postType: "",
  });
  const [tag, setTag] = useState("");
  const [numberOfComponents, setNumberOfComponents] = useState(1);

  const componentArray = new Array(numberOfComponents).fill(null);

  const onSubmit = async () => {
    console.log(post);
    setPost({ ...post, tag: [...post.tag, tag] });
    let image_url_arr = [];
    for (let i = 0; i < post.image.length; i++) {
      const data = new FormData();
      data.append("file", post.image[i]);
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
      image_url_arr.push(image_url);
    }

    let tempPost = post;
    for (let i = 0; i < post.image.length; i++) {
      tempPost.image[i] = image_url_arr[i];
    }

    setPost({ ...post, image: [...image_url_arr] });

    // API
    addPost(tempPost);

    handleClosePost();

    // window.location.reload()
  };

  const handleAdd = () => {
    setNumberOfComponents((prev) => prev + 1);
    setPost({ ...post, tag: [...post.tag, tag] });
    setTag("");
  };

  console.log(post);
  const options = ["Collab", "Design", "Model"];
  const defaultOption = options[0];

  const handlePostTypeChange = (selectedOption) => {
    setPost({ ...post, postType: selectedOption.value });
    console.log(post);
  };
  return (
    <Modal
      show={showPost}
      onHide={handleClosePost}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {componentArray.map((_, index) => (
            <Form.Group
              className={`mb-3 ${styles.uploadDiv}`}
              controlId="formGroupUpload"
              key={index}
            >
              <div>
                <Form.Label style={{ fontSize: "20px", color: "#00E5BE" }}>
                  Upload File
                </Form.Label>
                <input
                  id="file-uploader"
                  style={{ display: "block" }}
                  type="file"
                  onChange={(e) =>
                    setPost({
                      ...post,
                      image: [...post.image, e.target.files[0]],
                    })
                  }
                />
                <Form.Control
                  type="text"
                  placeholder="Tag"
                  onChange={(e) => setTag(e.target.value)}
                  style={{
                    marginTop: "10px",
                  }}
                />
              </div>
              {index + 1 === numberOfComponents && (
                <div>
                  <i
                    className={`fa-solid fa-circle-plus ${styles.plusIcon}`}
                    onClick={handleAdd}
                  ></i>
                </div>
              )}
            </Form.Group>
          ))}

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Dropdown
              options={options}
              onChange={handlePostTypeChange}
              value={post.postType}
              placeholder="Select an option"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              type="number"
              placeholder="Price"
              onChange={(e) =>
                setPost({ ...post, price: Number(e.target.value) })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              type="number"
              placeholder="Quantity"
              onChange={(e) =>
                setPost({ ...post, quantity: parseInt(e.target.value) })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            {/* <Form.Control type="text" placeholder="Size" onChange={(e) => setPost({...post, title: e.target.value})} /> */}
            <Form.Label style={{ fontSize: "20px", color: "#00E5BE" }}>
              Write Overview
            </Form.Label>
            <textarea
              rows="3"
              className={styles.textAreaInput}
              value={post.overview}
              onChange={(e) => {
                setPost((prevPost) => ({
                  ...prevPost,
                  overview: e.target.value,
                }));
                console.log(post.overview);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontSize: "20px", color: "#00E5BE" }}>
              Write Specifications
            </Form.Label>
            <textarea
              rows="3"
              className={styles.textAreaInput}
              value={post.specification}
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  specification: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Form>
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
      </Modal.Body>
    </Modal>
  );
};

ModalPost.propTypes = {
  addPost: propTypes.func.isRequired,
};

export default connect(null, { addPost })(ModalPost);
