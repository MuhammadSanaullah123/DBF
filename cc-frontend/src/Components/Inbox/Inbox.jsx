import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
// CSS
import styles from "./Inbox.module.css"
// @mui
import Grid from "@mui/material/Grid"
// React icons
import { AiOutlineLeft, AiOutlineSend } from "react-icons/ai"
// Components
import Navbar2 from '../Navbar2/Navbar2'
import Footer from '../Footer/Footer'
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"
// Spinner
import { RotatingLines } from  'react-loader-spinner'
// API
import { getConversationsByUserId } from "../../actions/user"

const Inbox = ({auth: { loading, user }, conversations: { conversationLoading, conversation }}) => {
    
    useEffect(() => {
        if(!loading) {
            console.log(user?._id)
            store.dispatch(getConversationsByUserId(user?._id))
        }
        
    }, [loading])
    console.log(conversation)

  return (
    <Grid container className={styles.inboxWrapper}>
        <Navbar2 />
        <Grid item xs={12} display="flex" justifyContent="center">
            <Grid item lg={6} xs={11}>
                <Grid item xs={12} className={styles.topNameWrap}>
                    <a href="/">
                        <AiOutlineLeft color='#fff' fontSize="27px" />
                    </a>
                    <span className={styles.titleName}>{user?.userName}</span>
                </Grid>
                <Grid item xs={12} marginTop="20px">
                    <h2 className={styles.subHeading}>Messages</h2>
                </Grid>
                <Grid item xs={12} padding="0 10px">
                    <div className={styles.messagesWrapper}>
                        {conversationLoading ?
                            <div style={{textAlign:'center'}}>
                                <RotatingLines
                                    strokeColor="#00e5be"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="64"
                                    visible={true}
                                />
                            </div>
                        :
                            (conversation.length > 0) ?
                                conversation.map((convo) => {
                                    console.log(convo)
                                    return (
                                        <a onClick={() => {
                                            sessionStorage.removeItem('receiverId')
                                            sessionStorage.setItem('receiverId', convo.user.receiverId)
                                        }} href={`/message/${convo.conversationId}`}>
                                            <Grid item xs={12} padding="20px 0" display="flex" justifyContent="space-between">  
                                                <div className={styles.conversationsWrapper} onClick={() => {
                                                    sessionStorage.removeItem('receiverId')
                                                    sessionStorage.setItem('receiverId', convo.user.receiverId)                
                                                }}>
                                                    <img src={convo.user.image} className={styles.conversationImg} alt="" />
                                                    <span className={styles.conversationName}>
                                                        {convo.user.fullName}
                                                        <p style={{color:'grey', fontSize:'15px'}}>{convo.user.email}</p>
                                                    </span>
                                                </div>
                                                <div className={styles.sendWrapper}>
                                                    <AiOutlineSend fontSize="25px" color="rgb(0, 229, 235)" />
                                                </div>                                            
                                            </Grid>
                                        </a>
                                    )
                                    
                                })
                            :
                            <div style={{color: 'red', lineHeight: 1.5, fontWeight: 600, fontSize:'25px', textAlign:'center', marginBottom:'50px'}}>You dont have any conversations</div> 
                        }
                    </div>
                </Grid>
            </Grid>
        </Grid>
        <Footer />
    </Grid>
  )
}

const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth,
    conversations: state.conversations
})

export default connect(mapStateToProps, null)(Inbox)