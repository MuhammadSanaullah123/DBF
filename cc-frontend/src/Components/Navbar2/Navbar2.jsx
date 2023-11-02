import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
// React Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
// CSS
import styles from "./Navbar2.module.css";
// Assets
import clock from "../../Images/clockimg.png";
import cart from "../../Images/cartNav.png";
import navLogo from "../../Images/webImg.png";
// React icons
import { AiTwotoneMessage } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { TbMessageCircle2 } from "react-icons/tb";
import { BsFillPersonFill } from "react-icons/bs";
// Components
import ModalCart from "./ModalCart";
// API
import { getLoggedInUser, logout } from "../../actions/auth";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";

const Navbar2 = ({ auth: { loading, user, isAuthenticated }, logout }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartData, setCartData] = useState();
  const [loadingTemp, setLoadingTemp] = useState(false);
  console.log(isAuthenticated);
  useEffect(() => {
    setLoadingTemp(true);
    setLoadingTemp(false);
  }, [loadingTemp]);

  return (
    <>
      {["lg"].map((expand) => (
        <>
          {isAuthenticated !== true ? (
            <Navbar key={expand} expand={expand} className={styles.navOuter}>
              <Container fluid className={styles.contnt}>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  className={styles.togl}
                >
                  <div className={styles.line1}></div>
                  <div className={styles.line2}></div>
                  <div className={styles.line3}></div>
                </Navbar.Toggle>
                <Navbar.Brand href="#">
                  <img src={navLogo} className={styles.navLogo} alt="" />
                </Navbar.Brand>

                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    ></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-start flex-grow-1 pe-3">
                      <a href="/" className={styles.NavLiks}>
                        Home
                      </a>
                      <a href="/feed" className={styles.NavLiks}>
                        Feed
                      </a>
                      {/* <a href="/profiler/me" className={styles.NavLiks}>Profile</a> */}
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className={styles.iconsArea}>
                  {/* <img src={clock} className={styles.clocks} alt="" />
                  <div className={styles.notificatArea}>
                    <AiTwotoneMessage className={styles.notiIcon}/>
                    <div className={styles.notitXT}>Notification</div>
                  </div> */}
                  {/* <BiHeart className={styles.heaert}/>
                  <a href="/inbox">
                    <TbMessageCircle2 className={styles.tb2} />
                  </a> */}
                  {/* <img src={cart} className={styles.cartImg} alt="" onClick={() => setShowCart(!showCart)} /> */}
                  {/* <span className={styles.cartNumber}>{user?.cart?.length || 0}</span> */}
                  {/* <ModalCart show={showCart} cartData={user?.cart} handleClose={() => setShowCart(false)} /> */}
                  {/* <Dropdown align={{ lg: 'end' }}>
                    <Dropdown.Toggle id="dropdown-account" className={styles.accountDropdown}>
                      <BsFillPersonFill color='rgb(0, 229, 235)' fontSize='30px' />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={logout}>Login</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  <a href="/login">
                    <button className={styles.loginBtn}>Login</button>
                  </a>
                </div>
              </Container>
            </Navbar>
          ) : (
            <Navbar key={expand} expand={expand} className={styles.navOuter}>
              <Container fluid className={styles.contnt}>
                <Navbar.Brand href="#">
                  <img src={navLogo} className={styles.navLogo} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  className={styles.togl}
                >
                  <div className={styles.line1}></div>
                  <div className={styles.line2}></div>
                  <div className={styles.line3}></div>
                </Navbar.Toggle>
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    ></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-start flex-grow-1 pe-3">
                      <a href="/" className={styles.NavLiks}>
                        Home
                      </a>
                      <a href="/feed" className={styles.NavLiks}>
                        Feed
                      </a>
                      <a href="/profiler/me" className={styles.NavLiks}>
                        Profile
                      </a>
                      <a href="/history" className={styles.NavLiks}>
                        History
                      </a>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className={styles.iconsArea}>
                  {/* <img src={clock} className={styles.clocks} alt="" />
                  <div className={styles.notificatArea}>
                    <AiTwotoneMessage className={styles.notiIcon}/>
                    <div className={styles.notitXT}>Notification</div>
                  </div> */}
                  <a href="/feed">
                    <BiHeart className={styles.heaert} />
                  </a>
                  <a href="/inbox">
                    <TbMessageCircle2 className={styles.tb2} />
                  </a>
                  <img
                    src={cart}
                    className={styles.cartImg}
                    alt=""
                    onClick={() => setShowCart(!showCart)}
                  />
                  <span className={styles.cartNumber}>
                    {user?.cart?.length || 0}
                  </span>
                  <ModalCart
                    show={showCart}
                    cartData={user?.cart}
                    handleClose={() => setShowCart(false)}
                  />
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      id="dropdown-account"
                      className={styles.accountDropdown}
                    >
                      <BsFillPersonFill
                        color="rgb(0, 229, 235)"
                        fontSize="30px"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Container>
            </Navbar>
          )}
        </>
      ))}
    </>
  );
};

Navbar2.propTypes = {
  logout: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar2);
