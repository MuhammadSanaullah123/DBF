import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Socket.io
import { io } from "socket.io-client";
// CSS
import styles from "./Message.module.css";
// @mui
import Grid from "@mui/material/Grid";
// React icons
import { AiOutlineLeft, AiOutlineSend } from "react-icons/ai";
// Components
import Navbar2 from "../Navbar2/Navbar2";
import Footer from "../Footer/Footer";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";
// API
import { getMessagesByConversationId } from "../../actions/user";
import { sendAMessage, getUserById } from "../../actions/user";

const Message = ({
  auth: { loading, user },
  conversations: { conversation, conversationLoading },
  sendAMessage,
  user: { users },
}) => {
  const [tempLoading, setTempLoading] = useState(false);
  const [content, setContent] = useState("");
  const [conversationHook, setConversationHook] = useState();
  const [socket, setSocket] = useState(null);

  const conversationId = window.location.href.split("/").pop();

  useEffect(() => {
    store.dispatch(getUserById(sessionStorage.receiverId));
    store.dispatch(getMessagesByConversationId(conversationId));

    if (conversation != null) setConversationHook(conversation);

    setSocket(io("http://localhost:6002"));
  }, [conversationLoading]);

  useEffect(() => {
    socket?.emit("addUser", user?._id);

    socket?.on("getUsers", (users) => {
      console.log("activeUsers :>> ", users);
    });

    socket?.on("getMessage", (data) => {
      console.log("data :>> ", data);
      setConversationHook((prev) => [
        ...prev,
        {
          user: {
            converstionId: data.conversationId,
            id: data.receiverId,
          },
          message: data.message,
        },
      ]);
      console.log(conversationHook);
    });
  }, [socket]);

  console.log("conversatonHook: ", conversationHook);

  const sendMessage = (e) => {
    try {
      const message = content;
      const senderId = user._id;
      const receiverId = sessionStorage.getItem("receiverId");
      console.log("senderId: ", senderId);

      socket?.emit("sendMessage", {
        conversationId,
        message,
        senderId,
        receiverId,
      });

      let tempObj = {
        conversationId,
        message,
        senderId,
        receiverId,
      };

      sendAMessage(tempObj);

      setConversationHook((prev) => [
        ...prev,
        {
          user: {
            converstionId: conversationId,
            id: receiverId,
          },
          message: message,
        },
      ]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container className={styles.messageWrapper}>
      <Navbar2 />
      {conversationLoading ? (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            top: "50vh",
            position: "relative",
          }}
        >
          <RotatingLines
            strokeColor="#00e5be"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        </div>
      ) : (
        <Grid item xs={12} display="flex" justifyContent="center">
          <Grid item xs={6}>
            <div className={styles.receiver}>
              <Grid item className={styles.receiverInformation}>
                <div className={styles.chatImage}>
                  <Link to="/inbox">
                    <AiOutlineLeft color="#fff" fontSize="30px" />
                    <img src={users?.image} alt="" width={60} height={60} />
                  </Link>
                </div>

                <div className={styles.chatName}>
                  <h3 className="">{users?.userName}</h3>
                  <p className>Online</p>
                </div>
                <div className={styles.callerIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-phone-outgoing"
                    width="33"
                    height="33"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#fff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    <path d="M15 9l5 -5" />
                    <path d="M16 4l4 0l0 4" />
                  </svg>
                </div>
              </Grid>
              <div className={styles.conversationWrapper}>
                <div className={styles.conversation}>
                  {conversationHook != undefined &&
                  conversationHook.length > 0 ? (
                    conversationHook?.map(({ message, user: { id } }) => {
                      // console.log("id", id)
                      // console.log("user?._id", user?._id)
                      return id === user?._id ? (
                        <div className={styles.sendingChat}>{message}</div>
                      ) : (
                        <div className={styles.incomingChat}>{message}</div>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        color: "red",
                        lineHeight: 1.5,
                        fontWeight: 600,
                        fontSize: "25px",
                        textAlign: "center",
                        marginBottom: "50px",
                      }}
                    >
                      No messages. Start the conversation by sending a text
                      message.
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.writeChat}>
                <input
                  type="text"
                  className="inputText"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="type a message..."
                />
                <button onClick={(e) => sendMessage(e)}>
                  <AiOutlineSend fontSize="30px" color="#00E5BE" />
                </button>
              </div>
            </div>
            <div className={styles.thirdColumn}></div>
          </Grid>
        </Grid>
      )}
      <Footer />
    </Grid>
  );
};

Message.propTypes = {
  sendAMessage: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  conversations: state.conversations,
});

export default connect(mapStateToProps, { sendAMessage })(Message);
