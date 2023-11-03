import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
// Components
import Navbar2 from "../Navbar2/Navbar2";
import ModalReview from "./ModalReview";
// CSS
import styles from "./ThankYou.module.css";
// MUI
import Grid from "@mui/material/Grid";
// API
import { createOrder } from "../../actions/order";
import { timesPurchased } from "../../actions/posts";
// Redux
import { Provider } from "react-redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";

const ThankYou = ({
  auth: { loading, user },
  order,
  createOrder,
  timesPurchased,
}) => {
  // Moyasar payment info
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const status = queryParameters.get("status");
  const amount = queryParameters.get("amount");
  const message = queryParameters.get("message");
  const [showCart, setShowCart] = useState(false);
  useEffect(() => {
    console.log(user?.cart);
    if (!loading) {
      createOrder(user?.cart);

      /* timesPurchased() */
      let id;
      if (user?.cart.length >= 1) {
        console.log("INSDIE CART IF");
        for (let i = 0; i < user?.cart.length; i++) {
          id = user?.cart[i].post._id;
          timesPurchased(id);
        }
      } else {
        console.log("INSIDE COOKES IF");

        id = Cookies.get("productID");
        console.log(id);
        timesPurchased(id);
      }

      /*       Cookies.remove("productID"); */
    }
  }, [loading]);

  return (
    <div className={styles.thankYouWrapper}>
      {/* Header */}
      <Navbar2 />
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Grid item xl={7} xs={10} display="flex">
            <Grid item>
              <img src={require("../../Images/Group 311.png")} />
            </Grid>
            <Grid item>
              <div className={styles.invoiceWrapper}>
                <h1 className={styles.thankYouTitle}>Thank You!</h1>
                <p className={styles.preThankYou}>
                  Your purchase went three successfully
                </p>
                <div className={styles.rowInvoice}>
                  <span className={styles.titleInvoice}>Order Number:</span>
                  <span className={styles.invoiceValues}>
                    {order?.order?.order?._id}
                  </span>
                </div>
                <div className={styles.rowInvoice}>
                  <span className={styles.titleInvoice}>
                    Delivery Location:
                  </span>
                  <span className={styles.invoiceValues}>2324324</span>
                </div>
                <div className={styles.rowInvoice}>
                  <span className={styles.titleInvoice}>Expected Date: </span>
                  <span className={styles.invoiceValues}>12/03/2026</span>
                </div>
                <div className={styles.rowInvoice}>
                  <span className={styles.titleInvoice}>
                    Moyasar Payment Status:{" "}
                  </span>
                  <span className={styles.invoiceValues}>{status}</span>
                </div>
                <div className={styles.rowInvoice}>
                  <span className={styles.titleInvoice}>
                    Moyasar Payment ID:{" "}
                  </span>
                  <span className={styles.invoiceValues}>{id}</span>
                </div>
                <div className={styles.rowInvoice}>
                  <span className={styles.titleInvoice}>Moyasar Message: </span>
                  <span
                    className={styles.invoiceValues}
                    style={{ color: "#00ffa3" }}
                  >
                    {message}
                  </span>
                </div>
                <div className={styles.rowInvoice}>
                  <span className={styles.titleInvoice}>Moyasar Amount: </span>
                  <span className={styles.invoiceValues}>$ {amount / 100}</span>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} align="center" margin="40px 0">
          <p className={styles.review}>Give us a Review to Get</p>
          <p className={styles.offer}>5% of your Next Order</p>
          <button
            className={styles.reviewBtn}
            onClick={() => setShowCart(!showCart)}
          >
            Review
          </button>
          <ModalReview
            postID={Cookies.get("productID")}
            show={showCart}
            handleClose={() => setShowCart(false)}
            cart={user?.cart}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  order: state.order,
});

ThankYou.propTypes = {
  createOrder: propTypes.func.isRequired,
  timesPurchased: propTypes.func.isRequired,
};
export default connect(mapStateToProps, { createOrder, timesPurchased })(
  ThankYou
);
