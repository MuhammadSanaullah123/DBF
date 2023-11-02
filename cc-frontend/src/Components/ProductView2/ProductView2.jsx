import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ProductView2.module.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import styles from "./ProductView2.module.css";
import Navbar2 from "../Navbar2/Navbar2";
import designerImg from "../../Images/designderimg.png";
import paperimg from "../../Images/feedProductImg1.png";
import { GrStar } from "react-icons/gr";
import Footer from "../Footer/Footer";
import DesignsSlider from "../ProductView/DesignsSlider/DesignsSlider";
import LikedSlider from "../ProductView/LikedSlider/LikedSlider";
// API
import { createOrder } from "../../API/order";
import { addToCart } from "../../actions/user";
import { getPostByID } from "../../actions/posts";
// Redux
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";

const ProductView2 = ({
  auth: { loading, user, isAuthenticated },
  posts: { post },
  addToCart,
}) => {
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [designPosts, setDesignPosts] = useState([]);
  const [selected, setSelected] = useState("specification");
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 600px)").matches
  );

  let tempPost = {};
  let tempPosts = {};
  let tempUser = {};
  let tempDesignPosts = [...designPosts];
  let tempLikedPosts = [...likedPosts];

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("/").pop();
    console.log(id);

    store.dispatch(getPostByID(id));

    // Add a listener to handle changes in screen size
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const setToToken = (id) => {
    Cookies.set("productID", post._id);
    const productID = Cookies.get("productID");
    console.log(productID);
  };

  const createAOrder = async (postID) => {
    // await createOrder({size: selectedSize, postId: postID},
    //     (res) => {
    //         console.log(res)
    //         Cookies.remove('productID')
    //         Cookies.set('productID', postID)
    //         const productID = Cookies.get('productID')
    //         console.log(productID)
    //         navigate('/checkout');
    //     },
    //     (error) => {
    //         console.log(error)
    //     }
    // )
    Cookies.remove("productID");
    Cookies.set("productID", postID);
    const productID = Cookies.get("productID");
    console.log(productID);
    navigate("/checkout");
  };

  const addCart = async (postID) => {
    let tempCart;
    addToCart(postID);
  };
  console.log(post);
  console.log(isAuthenticated);

  return (
    <>
      <div className={styles.viewOuter}>
        <Navbar2 />

        <>
          <div className={styles.overViewArea}>
            <div className={styles.overviewInner}>
              <div className={styles.designerInfo}>
                <img
                  src={user?.image}
                  className={styles.designImageArea}
                  alt=""
                />

                <div className={styles.designername}>{post?.userName}</div>
              </div>
              <div className={styles.mainImagArea}>
                {post?.image?.map((img, index) => (
                  <div key={index} className={styles.imageContainer}>
                    <img src={img} className={styles.paperimg} alt="" />
                    <p className={styles.paperimgtext}>{post?.tag[index]}</p>
                  </div>
                ))}

                <div className={styles.robert}>{post?.userName}</div>
              </div>
              <div className={styles.startsArea}>
                <div className={styles.designName}>{post?.title}</div>
                <div className={styles.startsRight}>
                  {post?.rating === 0 ? (
                    <>
                      {Array.from({ length: 5 }, (_, index) => (
                        <GrStar className={styles.startwhite} key={index} />
                      ))}
                    </>
                  ) : (
                    <>
                      {Array.from({ length: post?.rating }, (_, index) => (
                        <GrStar className={styles.startYellow} key={index} />
                      ))}
                      {Array.from({ length: 5 - post?.rating }, (_, index) => (
                        <GrStar className={styles.startWhite} key={index} />
                      ))}
                    </>
                  )}
                  <div className={styles.model}>Model</div>
                </div>
              </div>
              <div className={styles.stockDetail}>
                <div className={styles.productPrice}>${post?.price}</div>
                <div className={styles.stckNumbers}>
                  Only {post?.quantity} left in stock
                </div>
                <div className={styles.availText}>Available Sizes</div>
                <div className={styles.sizesdiv}>
                  <span
                    onClick={() => setSelectedSize("S")}
                    className={selectedSize == "S" ? styles.selectedSize : ""}
                  >
                    S
                  </span>
                  <span
                    onClick={() => setSelectedSize("M")}
                    className={selectedSize == "M" ? styles.selectedSize : ""}
                  >
                    M
                  </span>
                  <span
                    onClick={() => setSelectedSize("L")}
                    className={selectedSize == "L" ? styles.selectedSize : ""}
                  >
                    L
                  </span>
                  <span
                    onClick={() => setSelectedSize("XL")}
                    className={selectedSize == "XL" ? styles.selectedSize : ""}
                  >
                    XL
                  </span>
                  <span
                    onClick={() => setSelectedSize("xLL")}
                    className={selectedSize == "xLL" ? styles.selectedSize : ""}
                  >
                    xLL
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.specificationsArea}>
              <div className={styles.buttonsArea}>
                <button
                  className={
                    selected == "overview"
                      ? styles.overBuuton
                      : styles.overBuuton2
                  }
                  onClick={() => setSelected("overview")}
                >
                  Overview
                </button>
                <button
                  className={
                    selected == "specification"
                      ? styles.overBuuton
                      : styles.overBuuton2
                  }
                  onClick={() => setSelected("specification")}
                >
                  Specifications
                </button>
              </div>
              <div
                className={styles.listArea}
                style={{ fontSize: "25px", lineHeight: 2 }}
              >
                {selected == "specification" ? (
                  <div className={styles.listspec1}>
                    <div className={styles.specText}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post?.specification,
                        }}
                        style={{
                          lineHeight: isMobile ? 2 : 2,
                          fontSize: isMobile ? "15px" : "25px",
                          textAlign: "left",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.listspec1}>
                    <div
                      dangerouslySetInnerHTML={{ __html: post?.overview }}
                      style={{
                        color: "white",
                        fontSize: isMobile ? "15px" : "25px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <DesignsSlider designPosts={designPosts} />
            <LikedSlider likedPosts={likedPosts} />
          </div>
          {isAuthenticated && (
            <div className={styles.buyButtons}>
              <Link to="/checkout">
                <button
                  className={styles.buyNoq}
                  onClick={() => createAOrder(post._id)}
                >
                  Buy now
                </button>
              </Link>
              <button className={styles.add} onClick={() => addCart(post._id)}>
                Add to Cart
              </button>
            </div>
          )}
        </>

        <Footer />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  posts: state.posts,
  auth: state.auth,
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

ProductView2.propTypes = {
  addToCart: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { addToCart })(ProductView2);
