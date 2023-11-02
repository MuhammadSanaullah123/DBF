import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Feed.module.css";
import Navbar2 from "../Navbar2/Navbar2";
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

import ModalComments from "./ModalComments";
// API
import { getAllPosts, addLike } from "../../actions/posts";
// Redux
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";

const Feed = ({ posts: { loading, posts }, auth: { user }, addLike }) => {
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

  const likeAPost = async (postID) => {
    setLoadingTemp(true);
    addLike(postID);

    // setLoadingTemp(false)
  };
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
            postsHook?.map((item) => {
              const validReviews = item.reviews.filter(
                (review) => review.rating !== null
              );

              const totalRating = validReviews.reduce(
                (sum, review) => sum + review.rating,
                0
              );
              let averageRating = totalRating / validReviews.length;
              averageRating = Math.round(averageRating);
              return (
                <div className={styles.postCard}>
                  <div className={styles.postCardInner}>
                    <div className={styles.userinfo}>
                      <img
                        className={styles.imgBack}
                        src={item.postedBy.image}
                        alt=""
                      />
                      <div className={styles.userNmae}>
                        {item.postedBy.userName}
                      </div>
                    </div>
                    <div className={styles.productArea}>
                      <Link to={`/product/${item._id}`}>
                        <div
                          className={`${
                            item.image.length === 1
                              ? styles.productimgDiv_SingleImg
                              : styles.productimgDiv
                          }`}
                        >
                          {item?.image?.map((img, index) => (
                            <img
                              src={img}
                              className={`${
                                item.image.length === 1
                                  ? styles.productimg_singleImg
                                  : styles.productimg
                              }`}
                              alt=""
                              style={{
                                borderRadius:
                                  index === 0 && item?.image.length > 1
                                    ? "14px 14px 0 0"
                                    : index === item?.image.length - 1 &&
                                      item?.image.length > 1
                                    ? "0 0 14px 14px"
                                    : item?.image.length === 1
                                    ? "14px"
                                    : "0px",
                              }}
                            />
                          ))}
                          {/*   <img
                          src={item.image}
                          className={styles.productimg}
                          alt=""
                        /> */}
                        </div>
                        <div className={styles.produvtdetail}>
                          <div className={styles.sizesArea}>
                            <div className={styles.sizeHeading}>
                              Available Sizes
                            </div>
                            <div className={styles.sizesNAMES}>
                              <span>S</span>
                              <span>M</span>
                              <span>L</span>
                              <span>XL</span>
                            </div>
                          </div>
                          <div className={styles.designernmae}>
                            {item.userName}
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className={styles.feedBackArea}>
                      <div className={styles.expressArea}>
                        <div className={styles.iconsArea}>
                          {item?.likes?.length > 0 ? (
                            item?.likes?.map(
                              (like) =>
                                like._id == user?._id && (
                                  <AiFillHeart
                                    style={{
                                      color: "#00E5BE",
                                      fontSize: "20px",
                                    }}
                                  />
                                )
                            )
                          ) : (
                            <BiHeart
                              onClick={() => {
                                likeAPost(item._id);
                                item.likes.push({ _id: user?._id });
                              }}
                              className={styles.heaert}
                            />
                          )}
                          <AiTwotoneMessage
                            className={styles.notiIcon}
                            onClick={() => {
                              setShow(true);
                              setPostIdComment(item._id);
                              setComments(item.comments);
                            }}
                          />
                          <BsFillShareFill className={styles.shareIcon} />
                        </div>
                        <div className={styles.starsArea}>
                          {item.reviews.length === 0 ? (
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
                                { length: averageRating },
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
                                { length: 5 - averageRating },
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
                        onClick={() => handleCart(item)}
                      >
                        Model
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <ModalComments
          show={show}
          handleClose={() => setShow(false)}
          comments={comments}
          user={user}
          postId={postIdComment}
          loading={loadingTemp}
          closeLoading={() => setLoadingTemp(false)}
          startLoading={() => setLoadingTemp(true)}
        />
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

Feed.propTypes = {
  addLike: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  posts: state.posts,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { addLike })(Feed);
