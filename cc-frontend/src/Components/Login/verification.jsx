import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import webImg from "../../Images/webImg.png";
import gogle from "../../Images/gog1.png";
import fb from "../../Images/gog2.png";
import apple from "../../Images/gog3.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// API
import { verification } from '../../actions/auth'
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"

const Verification = ({ verification }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setToken(token);
    console.log("token:", token);
  }, []);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    verification(token)
    setLoading(false)
  };
  return (
    <>
      <div className={styles.loginOuter}>
        <div className={styles.loginMain}>
          <img src={webImg} className={styles.webImg} alt="" />
          <div className={styles.inputsArea}>
            <div className={styles.lginText}>VERIFICATION</div>
          </div>
          <div className={styles.LowerSection}>
            <button className={styles.loginText} onClick={handleFormSubmit}>
              {loading == true ? "Loading" : "Click on it"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Verification.propTypes = {
  verification: propTypes.func.isRequired
}

export default connect(null, { verification })(Verification);
