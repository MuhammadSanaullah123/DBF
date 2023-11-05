import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./History.module.css";
import Navbar2 from "../Navbar2/Navbar2";
import Moment from "react-moment";
import moment from "moment";
import productImg from "../../Images/feedProductImg1.png";
import userImg from "../../Images/designderimg.png";
import Model from "./Model";
// React icons
import { BiHeart } from "react-icons/bi";
import { AiTwotoneMessage, AiFillHeart } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { GrStar } from "react-icons/gr";
import centerImg from "../../Images/HomebottomImg.png";
import Footer from "../Footer/Footer";
import StoriesSlider from "../Home/StoriesSlider/StoriesSlider";
// API
import { getUser } from "../../API/auth";
import { getPost } from "../../API/post";

// API
import { getAllPosts, addLike } from "../../actions/posts";
// Redux
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";

const History = ({ posts: { loading, posts }, auth: { user }, addLike }) => {
  const [postsHook, setPostsHook] = useState();
  const [loadingTemp, setLoadingTemp] = useState(false);
  const [postIdComment, setPostIdComment] = useState("");
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState();
  const [showCart, setShowCart] = useState(false);
  const [currentPost, setCurrentPost] = useState();

  let tempUser = {};
  let tempPosts = {};

  useEffect(() => {
    if (!loading) setPostsHook(posts);
    setLoadingTemp(true);
    store.dispatch(getAllPosts());
    console.log(loadingTemp);
    setLoadingTemp(false);
  }, [postsHook, loading]);

  const handleCart = (item) => {
    setCurrentPost(item);
    setShowCart(!showCart);
  };

  console.log(postsHook);
  return (
    <>
      <div className={styles.feedOuter}>
        <Navbar2 />
        <StoriesSlider />
        <div className={styles.postsArea}>
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
          ) : (
            user?.orders
              ?.filter((order) => order.orderItems.length >= 1)
              ?.map((item) => (
                <div
                  style={{
                    borderBottom: "1.73574px solid #343434",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "50px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      color: "#fff",
                      marginTop: "10px",
                      fontSize: "18px",
                    }}
                  >
                    Order ID:{" "}
                    <p
                      style={{
                        color: "#00e5be",
                        margin: "0",
                        marginLeft: "30px",
                        fontSize: "18px",
                        lineBreak: "anywhere",
                      }}
                    >
                      {item._id}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      color: "#fff",
                      marginTop: "10px",
                      fontSize: "18px",
                    }}
                  >
                    Date:{" "}
                    <p
                      style={{
                        color: "#00e5be",
                        margin: "0",
                        marginLeft: "30px",
                        fontSize: "18px",
                      }}
                    >
                      {moment(item.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div className={styles.orderDiv}>
                    {item.orderItems?.map((order, index) => {
                      let currentPost = postsHook?.filter(
                        (post) => post._id === order.post
                      );
                      if (currentPost) {
                        currentPost = currentPost[0];
                      }
                      console.log(currentPost);
                      return (
                        <div className={styles.postCard}>
                          <div className={styles.postCardInner}>
                            <div className={styles.userinfo}>
                              <img
                                className={styles.imgBack}
                                src={currentPost?.postedBy.image}
                                alt=""
                              />
                              <div className={styles.userNmae}>
                                {currentPost?.postedBy.userName}
                              </div>
                            </div>
                            <div className={styles.productArea}>
                              <Link to={`/product/${order.post}`}>
                                <div
                                  className={`${
                                    order.image.length === 1
                                      ? styles.productimgDiv_SingleImg
                                      : styles.productimgDiv
                                  }`}
                                >
                                  {order?.image?.map((img, index) => (
                                    <img
                                      src={img}
                                      className={`${
                                        order.image.length === 1
                                          ? styles.productimg_singleImg
                                          : styles.productimg
                                      }`}
                                      alt=""
                                      style={{
                                        borderRadius:
                                          index === 0 && order?.image.length > 1
                                            ? "14px 14px 0 0"
                                            : index ===
                                                order?.image.length - 1 &&
                                              order?.image.length > 1
                                            ? "0 0 14px 14px"
                                            : order?.image.length === 1
                                            ? "14px"
                                            : "0px",
                                      }}
                                    />
                                  ))}
                                </div>
                                <div className={styles.produvtdetail}>
                                  <div className={styles.designernmae}>
                                    {currentPost?.title}
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div className={styles.feedBackArea}>
                              <div className={styles.expressArea}>
                                <div className={styles.starsArea}>
                                  {order.rating === 0 ? (
                                    <>
                                      {Array.from({ length: 5 }, (_, index) => (
                                        <GrStar
                                          className={styles.startwhite}
                                          key={index}
                                        />
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {Array.from(
                                        { length: order.rating },
                                        (_, index) => {
                                          return (
                                            <GrStar
                                              className={styles.startYellow}
                                              key={index}
                                            />
                                          );
                                        }
                                      )}
                                      {Array.from(
                                        { length: 5 - order.rating },
                                        (_, index) => (
                                          <GrStar
                                            className={styles.startwhite}
                                            key={index}
                                          />
                                        )
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                              <div
                                className={styles.modelTilt}
                                onClick={() => handleCart(currentPost)}
                              >
                                Model
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
          )}
        </div>

        <Model
          currentPost={currentPost}
          show={showCart}
          handleClose={() => setShowCart(false)}
        />
        <div className={styles.centerImage}>
          <img src={centerImg} className={styles.centImage} alt="" />
        </div>
        <Footer />
      </div>
    </>
  );
};

History.propTypes = {
  /*  addLike: propTypes.func.isRequired, */
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  posts: state.posts,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(History);
