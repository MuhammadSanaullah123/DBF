import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import styles from "./Camera..module.css";
import { ImCross } from "react-icons/im";
import capBut from "../../Images/capBut.png";
import lastImg from "../../Images/lastImg.png";
import vector from "../../Images/vector.png";
// import { uploadImage } from "../../API/auth"
// API
import { uploadImage } from "../../actions/user";
//redux
import store from "../../store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";

const Camera = ({ uploadImage }) => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);

  const capturePicture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, []);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", capturedImage);
    data.append("upload_preset", "u928wexc");
    data.append("cloud_name", "dihkvficg");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dihkvficg/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const resData = await res.json();
    console.log(resData.secure_url);
    const imageData = {
      image: resData.secure_url,
    };
    uploadImage(imageData);
    // await uploadImage(imageData,
    //   (res) => {
    //     console.log(res)
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )
  };

  return (
    <>
      <div className={styles.cameraMain}>
        {capturedImage ? (
          <div style={{ textAlign: "center" }}>
            <img
              src={capturedImage}
              alt="Captured"
              style={{ height: "100vh" }}
            />
            <ImCross
              className={styles.cross}
              onClick={() => setCapturedImage(null)}
            />
            <div className={styles.captureArea}>
              <button
                onClick={capturePicture}
                style={{ border: "none", background: "transparent" }}
              >
                <img src={capBut} className={styles.capBut} alt="" />
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "65vw",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={styles.textCap}>Upload From File</div>
                  <button
                    onClick={handleSubmit}
                    style={{
                      border: "1px solid #00E5BE",
                      background: "#00E5BE",
                      color: "white",
                      borderRadius: "10px",
                      height: "40px",
                      width: "80px",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* <img src={lastImg} alt="" className={styles.lastImg} /> */}
            <img src={vector} className={styles.vector} alt="" />
          </div>
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{
                width: 750,
                height: 620,
                facingMode: "user",
              }}
              className={styles.cameDiv}
            />
            <ImCross className={styles.cross} />
            <div className={styles.captureArea}>
              <button
                onClick={capturePicture}
                style={{ border: "none", background: "transparent" }}
              >
                <img src={capBut} className={styles.capBut} alt="" />
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "65vw",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={styles.textCap}>
                    Upload From File
                    <input
                      id="file-uploader"
                      style={{ position: "relative", top: "-40px", opacity: 0 }}
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCapturedImage(reader.result);
                            console.log("onloadend working", reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    style={{
                      border: "1px solid #00E5BE",
                      background: "#00E5BE",
                      color: "white",
                      borderRadius: "10px",
                      height: "40px",
                      width: "80px",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* <img src={lastImg} alt="" className={styles.lastImg} /> */}
            <img src={vector} className={styles.vector} alt="" />
          </>
        )}
      </div>
    </>
  );
};

Camera.propTypes = {
  uploadImage: propTypes.func.isRequired,
};

export default connect(null, { uploadImage })(Camera);
