import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
// CSS
import styles from "./Login.module.css";
// Assets
import webImg from "../../Images/webImg.png";
import gogle from "../../Images/gog1.png";
import fb from "../../Images/gog2.png";
import apple from "../../Images/gog3.png";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Swal from "sweetalert2";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import { loginAuth } from "../../actions/auth";
// Utils
import { getGoogleOAuthURL } from "../../utils/getGoogleUrl";

const Login = ({ loginAuth }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedRememberMe === "true") {
      setState({
        ...state,
        password: savedPassword,
        email: savedEmail,
        remember: true,
      });
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!state.terms) {
      return Swal.fire("check terms and services", "", "error");
    }
    setLoading(true);
    loginAuth(state);
    setLoading(false);

    // Handle remember me
    if (state.remember) {
      localStorage.setItem("email", state.email);
      localStorage.setItem("password", state.password);
      localStorage.setItem("rememberMe", true);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
  };

  const responseGoogle = (response) => {
    // Handle the Google Sign-In response
    console.log(response);
  };

  return (
    <>
      <div className={styles.loginOuter}>
        <div className={styles.loginMain}>
          <img src={webImg} className={styles.webImg} alt="" />
          <div className={styles.inputsArea}>
            <div className={styles.lginText}>Login</div>
            <input
              value={state.email}
              name="email"
              type="text"
              onChange={handleChange}
              className={styles.emailInput}
              placeholder="Email Address"
            />
            <div className={styles.relatie}>
              <input
                value={state.password}
                name="password"
                type={show == true ? "text" : "password"}
                className={styles.emailInput}
                placeholder="Password"
                onChange={handleChange}
              />{" "}
              <span
                className={styles.abss}
                onClick={() => {
                  setShow(!show);
                }}
              >
                {" "}
                {show === true ? (
                  <AiFillEyeInvisible color="#e2703a" />
                ) : (
                  <AiOutlineEye color="#e2703a" />
                )}
              </span>
            </div>

            <div className={styles.remembertext}>
              <Link to="/forgot-password">Forgot Password</Link>
            </div>

            <div className={styles.rememberArea}>
              <input
                type="checkbox"
                checked={state.remember}
                className={styles.checkedInput}
                onChange={(e) => {
                  setState({ ...state, remember: e.target.checked });
                }}
              />
              <div className={styles.rememText}>Remember me!</div>
            </div>
            <div className={styles.rememberArea} style={{ marginTop: "11px" }}>
              <input
                type="checkbox"
                checked={state.terms}
                className={styles.checkedInput}
                onChange={(e) => {
                  setState({ ...state, terms: e.target.checked });
                }}
              />
              <div className={styles.rememText}>
                I agree to terms and services{" "}
                <span className={styles.clikHere}>click here</span> to read more
              </div>
            </div>
          </div>
          <div className={styles.LowerSection}>
            <button className={styles.loginText} onClick={handleFormSubmit}>
              {loading == true ? "Loading" : "Login"}
            </button>
            <div className={styles.loginWith}>Or login with</div>
            <div className={styles.logosArea}>
              <form action="http://localhost:6002/user/auth/google">
                <button type="submit" className={styles.googleButton}>
                  <img src={gogle} alt="" />
                </button>
              </form>
              <form action="http://localhost:6002/user/auth/facebook">
                <button type="submit" className={styles.googleButton}>
                  <img src={fb} className={styles.Google} alt="" />
                </button>
              </form>
              {/*    <form action="http://localhost:6002/auth/apple">
                <button type="submit" className={styles.googleButton}>
                  <img src={apple} className={styles.Google} alt="" />
                </button>
              </form> */}
              {/*    <img src={apple} className={styles.Google} alt="" /> */}
            </div>
            <Link to="/signup">
              <button className={styles.signup}>Sign up manually</button>
            </Link>
            <Link to="/">
              <button className={styles.continu}>Continue as a Guest</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  loginAuth: propTypes.func.isRequired, // react/no-typos
};

export default connect(null, { loginAuth })(Login);
