import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HomeHeader.module.css";
// React Icons
import { BsFillFunnelFill } from "react-icons/bs";
// Assets
import cardsImage from "../../../Images/homecard1.png";
import cardsImage2 from "../../../Images/homecard2.png";
import weekImage from "../../../Images/week1.png";
import weekImage2 from "../../../Images/week2.png";
import designIMg from "../../../Images/designderimg.png";
// Spinner
import { RotatingLines } from "react-loader-spinner";
//redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";
//API
import {
  getTrendingPosts,
  getDesignOfDay,
  getDesignOfMonth,
  getDesignOfYear,
  getTopModels,
} from "../../../actions/posts";
import { getAllUsers, followUser } from "../../../actions/user";

const HomeHeader = ({
  posts: {
    loading,
    trendingPosts,
    designOfDay,
    designOfMonth,
    designOfYear,
    models,
  },
  user: { users },
  followUser,
  auth: { user },
}) => {
  console.log(users);
  useEffect(() => {
    store.dispatch(getTrendingPosts());
    store.dispatch(getDesignOfDay());
    store.dispatch(getDesignOfMonth());
    store.dispatch(getDesignOfYear());
    store.dispatch(getAllUsers());
  }, [store]);
  console.log(trendingPosts);
  return (
    <>
      <div className={styles.trendingArea}>
        <div className={styles.textArea}>
          <div className={styles.trendingHeading}>
            <div className={styles.treandHead}>Trending</div>
            <BsFillFunnelFill className={styles.funnel} />
          </div>
          <div className={styles.viewAll}>View all</div>
        </div>
        <div className={styles.cardAREA}>
          {loading == false ? (
            trendingPosts?.top10Posts?.map((item) => (
              <Link to={`/product/${item?._id}`}>
                <div className={styles.cardsMain} key={item?._id}>
                  <div className={styles.uperCard}>
                    {item?.image?.map((img, index) => (
                      <img
                        src={img}
                        className={styles.cardsImage}
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
                  </div>
                  <div className={styles.cardsDown}>{item?.userName}</div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ width: "100vw", textAlign: "center" }}>
              <RotatingLines
                strokeColor="#00e5be"
                strokeWidth="5"
                animationDuration="0.75"
                width="64"
                visible={true}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.designArea}>
        <div className={styles.textArea}>
          <div className={styles.trendingHeading}>
            <div className={styles.treandHead2}>Design of the Day</div>
          </div>
        </div>
        <div className={styles.cardAREA}>
          {loading == false ? (
            designOfDay?.message == "No posts found in last 24 hours" ? (
              <div
                style={{
                  color: "red",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  fontSize: "25px",
                }}
              >
                {designOfDay?.message}
              </div>
            ) : (
              designOfDay?.sortedPosts.slice(0, 5).map((item) => (
                <Link to={`/product/${item?._id}`}>
                  <div className={styles.cardsMain}>
                    <div className={styles.uperCard}>
                      {item?.image?.map((img, index) => (
                        <img
                          src={img}
                          className={`${
                            item?.image.length === 1
                              ? styles.cardsImage_SingleImage
                              : styles.cardsImage
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
                    </div>
                  </div>
                </Link>
              ))
            )
          ) : (
            <div style={{ width: "100vw", textAlign: "center" }}>
              <RotatingLines
                strokeColor="#00e5be"
                strokeWidth="5"
                animationDuration="0.75"
                width="64"
                visible={true}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.designArea}>
        <div className={styles.textArea}>
          <div className={styles.trendingHeading}>
            <div className={styles.treandHead2}>Design of the Month</div>
          </div>
        </div>
        <div className={styles.cardAREA2}>
          {loading == false ? (
            designOfMonth?.slice(0, 4).map((item) => (
              <Link to={`/product/${item?._id}`}>
                <div className={styles.cardsMain}>
                  <div
                    className={item.flag ? styles.uperCard3 : styles.uperCard4}
                  >
                    {item?.image?.map((img, index) => (
                      <img
                        src={img}
                        className={`${
                          item?.image.length === 1
                            ? styles.cardsImage2_SingleImage
                            : styles.cardsImage2
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
                  </div>
                  <div className={styles.cardsDown}>{item?.userName}</div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ width: "100vw", textAlign: "center" }}>
              <RotatingLines
                strokeColor="#00e5be"
                strokeWidth="5"
                animationDuration="0.75"
                width="64"
                visible={true}
              />
            </div>
          )}
        </div>
        <div className={styles.viewLower}>View all</div>
      </div>
      <div className={styles.designArea}>
        <div className={styles.textArea}>
          <div className={styles.trendingHeading}>
            <div className={styles.treandHead2}>Design of the Year</div>
          </div>
        </div>
        <div className={styles.cardAREA2}>
          {loading == false ? (
            designOfYear?.slice(0, 4).map((item) => (
              <Link to={`/product/${item?._id}`}>
                <div className={styles.cardsMain}>
                  <div
                    className={item.flag ? styles.uperCard3 : styles.uperCard4}
                  >
                    {item?.image?.map((img, index) => (
                      <img
                        src={img}
                        className={styles.cardsImage2}
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
                  </div>
                  <div className={styles.cardsDown}>{item?.userImage}</div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ width: "100vw", textAlign: "center" }}>
              <RotatingLines
                strokeColor="#00e5be"
                strokeWidth="5"
                animationDuration="0.75"
                width="64"
                visible={true}
              />
            </div>
          )}
        </div>
        <div className={styles.viewLower}>View all</div>
      </div>
      {user !== null && (
        <div className={styles.designArea}>
          <div className={styles.textArea}>
            <div className={styles.trendingHeading}>
              <div className={styles.treandHead2}>Most Talented Designers</div>
            </div>
          </div>
          <div className={styles.designCardsArea}>
            {users?.length > 0 ? (
              users?.slice(0, 5).map((user) => (
                <div className={styles.cardsMain}>
                  <Link to={`/profiler/${user._id}`}>
                    <div className={styles.designCard2}>
                      <img
                        src={user?.image}
                        className={styles.designImg}
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className={styles.designName}>
                    {user?.firstName + " " + user?.lastName}
                  </div>
                  <button
                    className={styles.follewButton}
                    onClick={() => followUser(user._id)}
                  >
                    Follow
                  </button>
                </div>
              ))
            ) : (
              <div style={{ width: "100vw", textAlign: "center" }}>
                <RotatingLines
                  strokeColor="#00e5be"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="64"
                  visible={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

HomeHeader.propTypes = {
  followUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  trendingPosts: state.trendingPosts,
  designOfDay: state.posts.designOfDay,
  designOfMonth: state.posts.designOfMonth,
  designOfYear: state.posts.designOfYear,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { followUser })(HomeHeader);
