import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
// React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// React icons
import { ImCross } from "react-icons/im";
// API
import { removeCart } from "../../API/auth";
import { createApplePayOrder } from "../../API/order";
// Swal
import Swal from "sweetalert2";

const ModalCart = ({ show, cartData, handleClose, orderLoading }) => {
  const [cartDataTemp, setCartDataTemp] = useState([]);
  const [total, setTotal] = useState(0);
  console.log("cartData", cartDataTemp);

  useEffect(() => {
    if (cartData != undefined) {
      setCartDataTemp(cartData);
    }

    const setTotalFunction = () => {
      console.log("cartDataTemp", cartDataTemp);
      console.log("if working");
      let tempTotal = 0;
      for (let i = 0; i < cartDataTemp.length; i++) {
        tempTotal = tempTotal + cartDataTemp[i].post.price;
        setTotal(tempTotal);
      }
    };
    setTotalFunction();
  }, [cartData, cartDataTemp]);

  /*   useEffect(() => {
    if (orderLoading === false) {
      setCartDataTemp([]);
    }
  }, [orderLoading]); */

  const removeFromCart = async (itemID) => {
    await removeCart(
      itemID,
      (res) => {
        Swal.fire(res.message);
      },
      (error) => {
        Swal.fire(error?.response?.data.error);
      }
    );
    const tempCart = cartDataTemp.filter((item) => item._id !== itemID);
    console.log("tempCart", tempCart);
    setCartDataTemp(tempCart);
  };
  const moyasar = async () => {
    // create order on thank you page
    // await createApplePayOrder(applePayData,
    //   (res) => {
    //       console.log(res)
    //   },
    //   (error) => {
    //       console.log(error)
    //   }
    // )
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartData != undefined &&
          cartData.length > 0 &&
          orderLoading !== false ? (
            cartDataTemp?.map((item, index) => {
              return (
                <div>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <ImCross
                      style={{ color: "red" }}
                      onClick={() => removeFromCart(item._id)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                    }}
                    key={item?._id}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "25px",
                          marginBottom: "10px",
                        }}
                      >
                        {item?.post.title}
                      </div>
                      <div style={{ display: "flex" }}>
                        <img
                          src={item?.post.image}
                          width="80"
                          height="80"
                          alt=""
                        />
                        <div style={{ fontWeight: 600, marginLeft: "10px" }}>
                          #{item?.post.postedBy.userName}
                        </div>
                        <div
                          style={{
                            fontWeight: 600,
                            marginLeft: "10px",
                            fontSize: "20px",
                            color: "#00E5EB",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div style={{ alignSelf: "self-end" }}>
                      <div
                        style={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontSize: "20px",
                        }}
                      >
                        ${item?.post.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ fontWeight: 600, textAlign: "center" }}>
              <span style={{ fontSize: "25px" }}>"</span>No items added to cart
              <span style={{ fontSize: "25px" }}>"</span>
            </div>
          )}

          {cartData != undefined &&
            cartData.length > 0 &&
            orderLoading !== false && (
              <div style={{ display: "flex", justifyContent: "right" }}>
                <div
                  style={{
                    marginRight: "30px",
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  Total:
                </div>
                <div style={{ fontSize: "30px" }}>${total}</div>
              </div>
            )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Link to="/payment">
              <button
                style={{
                  textAlign: "center",
                  border: "1px solid #00E5EB",
                  background: "#00E5EB",
                  color: "white",
                  borderRadius: "5px",
                  padding: "5px 10px 5px 10px",
                  fontWeight: 600,
                }}
              >
                Proceed to checkout
              </button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCart;
