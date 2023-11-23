import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Profilerbottom.module.css";
// React Icons
import { IoIosFunnel } from "react-icons/io";
// API
import { getUserById, get } from "../../../actions/user";
import { GetLoggedInUser } from "../../../actions/auth";
// Redux
import store from "../../../store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
// Spinner
import { RotatingLines } from "react-loader-spinner";

const Profilerbotom = ({ auth: { loading, user }, user: { users } }) => {
  const [option, setOption] = useState("Design");
  useEffect(() => {
    if (id != "me") {
      store.dispatch(getUserById(id));
    } else {
      store.dispatch(GetLoggedInUser());
    }
  }, []);

  const url = window.location.href;
  const id = url.split("/").pop();
  console.log("USER");
  console.log(user);
  return (
    <>
      <div className={styles.modelingArea}>
        <div className={styles.buttonsArea}>
          <div className={styles.rightButtons}>
            <button
              onClick={() => {
                option === "Design" ? setOption("") : setOption("Design");
              }}
              className={option === "Design" ? styles.design1 : styles.design2}
            >
              Design
            </button>
            <button
              onClick={() => {
                option === "Collab" ? setOption("") : setOption("Collab");
              }}
              className={option === "Collab" ? styles.design1 : styles.design2}
            >
              Collabs
            </button>
            <button
              onClick={() => {
                option === "Model" ? setOption("") : setOption("Model");
              }}
              className={option === "Model" ? styles.design1 : styles.design2}
            >
              Modeling
            </button>
          </div>
          <IoIosFunnel className={styles.funnel} />
        </div>
        <div className={styles.imagesArea}>
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
          ) : id != "me" ? (
            users?.posts?.length == 0 ? (
              <p className="red-warning">This user doesnt have any post yet</p>
            ) : (
              users?.posts?.map((post) => (
                <Link to={`/product/${post._id}`}>
                  {post?.image?.map((item, index) => (
                    <img
                      src={item}
                      className={`${
                        post.image.length === 1
                          ? styles.imgstreet_singleimg
                          : styles.imgstreet
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
                </Link>
              ))
            )
          ) : user?.posts?.length == 0 ? (
            <p className="red-warning">You dont have any posts yet</p>
          ) : option !== "" ? (
            user?.posts
              ?.filter((post) => post.postType === option)
              .map((post) => (
                <Link className={styles.postImages} to={`/product/${post._id}`}>
                  {post?.image?.map((item, index) => (
                    <img
                      src={item}
                      className={`${
                        post.image.length === 1
                          ? styles.imgstreet_singleimg
                          : styles.imgstreet
                      }`}
                      alt=""
                      style={{
                        borderRadius:
                          index === 0 && post.image.length > 1
                            ? "14px 14px 0 0"
                            : index === post?.image.length - 1 &&
                              post.image.length > 1
                            ? "0 0 14px 14px"
                            : post?.image.length === 1 && "14px",
                      }}
                    />
                  ))}
                </Link>
              ))
          ) : (
            user?.posts?.map((post) => (
              <Link className={styles.postImages} to={`/product/${post._id}`}>
                {post?.image?.map((item, index) => (
                  <img
                    src={item}
                    className={`${
                      post.image.length === 1
                        ? styles.imgstreet_singleimg
                        : styles.imgstreet
                    }`}
                    alt=""
                    style={{
                      borderRadius:
                        index === 0
                          ? "14px 14px 0 0"
                          : index === post?.image.length - 1
                          ? "0 0 14px 14px"
                          : post?.image.length === 1
                          ? "14px"
                          : "0px",
                    }}
                  />
                ))}
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

Profilerbotom.propTypes = {
  // posts: propTypes.func.isRequired
  auth: propTypes.func.isRequired,
  user: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, null)(Profilerbotom);
