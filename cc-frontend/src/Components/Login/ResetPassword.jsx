import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import webImg from "../../Images/webImg.png";
import gogle from "../../Images/gog1.png";
import fb from "../../Images/gog2.png";
import apple from "../../Images/gog3.png";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { Forgot, Reset, login } from "../../API/auth";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [state, setState] = useState({
    confirmPassword: "",
    password: "",
    terms: "",
  });
  function validate_password(password) {
    let check =
      /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
    if (password.match(check)) {
      console.log("Your password is strong.");
      return true;
    } else {
      console.log("Meh, not so much.");
      return false;
    }
  }
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setToken(token);
    setState({ ...state, forgotToken: token });
    console.log("token:", token);
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!state.password || !state.confirmPassword)
      return Swal.fire("Enter valid passwords", "", "error");
    if (state.password !== state.confirmPassword)
      return Swal.fire(
        "Passwords dont match. Please enter again.",
        "",
        "error"
      );
    if (!state.terms) {
      return Swal.fire("check terms and services", "", "error");
    }
    if (validate_password(state.password)) {
      setLoading(true);
      Reset(
        state,
        (res) => {
          setLoading(false);
          sessionStorage.setItem("token", res.token);
          Swal.fire(res.message);
          navigate("/login");
        },
        (error) => {
          Swal.fire(error?.response?.data?.message || "Something went wrong");
          setLoading(false);
        }
      );
    } else {
      return Swal.fire(
        " Please enter a password with a minimum of 8 characters, including at least 1 digit, one Cap and 1 special character.",
        "",
        "error"
      );
    }
  };
  return (
    <>
      <div className={styles.loginOuter}>
        <div className={styles.loginMain}>
          <img src={webImg} className={styles.webImg} alt="" />
          <div className={styles.inputsArea}>
            <div className={styles.lginText}>Login</div>
            <div className={styles.relatie}>
              <input
                value={state.password}
                name="password"
                type={show == true ? "text" : "password"}
                className={styles.emailInput}
                placeholder="create new password"
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
            <div className={styles.relatie}>
              <input
                value={state.confirmPassword}
                name="confirmPassword"
                type={show == true ? "text" : "password"}
                className={styles.emailInput}
                placeholder="create new confirm password"
                onChange={handleChange}
              />{" "}
              <span
                className={styles.abss}
                onClick={() => {
                  setShow1(!show1);
                }}
              >
                {" "}
                {show1 === true ? (
                  <AiFillEyeInvisible color="#e2703a" />
                ) : (
                  <AiOutlineEye color="#e2703a" />
                )}
              </span>
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
              {loading == true ? "Loading" : "Set Passowrd"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
