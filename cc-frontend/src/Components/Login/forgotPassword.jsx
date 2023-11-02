import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import webImg from "../../Images/webImg.png";
import gogle from "../../Images/gog1.png";
import fb from "../../Images/gog2.png";
import apple from "../../Images/gog3.png";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { Forgot, login } from "../../API/auth";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    Forgot(
      state,
      (res) => {
        setLoading(false);
        Swal.fire(res.message);
      },
      (error) => {
        Swal.fire(error?.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    );
  };
  return (
    <>
      <div className={styles.loginOuter}>
        <div className={styles.loginMain}>
          <img src={webImg} className={styles.webImg} alt="" />
          <div className={styles.inputsArea}>
            <div className={styles.lginText}>Forgot Password</div>
            <input
              value={state.email}
              name="email"
              type="text"
              onChange={handleChange}
              className={styles.emailInput}
              placeholder="Email Address"
            />

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
          </div>
          <div className={styles.LowerSection}>
            <button className={styles.loginText} onClick={handleFormSubmit}>
              {loading == true ? "Loading" : "Send Email"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
