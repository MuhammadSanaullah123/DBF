import React, { useState, useEffect, useCallback } from 'react'
// import "./Feed.module.css"
// React Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// React icons
import { ImCross } from 'react-icons/im'
// API
import { removeCart } from "../../API/auth"
import { addComment } from "../../actions/posts"
// Swal
import Swal from "sweetalert2";
// Redux
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"
// Spinner
import { RotatingLines } from  'react-loader-spinner'

const ModalComments = ({ auth: { user }, addComment, comments, loading, show, handleClose, postId, startLoading, closeLoading }) => {
  const [content, setContent] = useState('')
  const [loadingTemp, setLoadingTemp] = useState(false)

  useEffect(() => {
    startLoading()
    console.log(loadingTemp)
    closeLoading()
  }, [loading, content])
  

  const commentAPost = async () => {
    let obj = {
      content: content,
      postID: postId
    }

    console.log("obj", obj)
    
    addComment(obj)
    
    
    // handleClose()
    comments.push({
      content: content,
      user: {
        image: user.image,
        userName: user.userName
      }
    })
    setContent('')
  }

  console.log(comments)
  
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
        <Modal.Body>
        {
          comments !== undefined &&
          comments.length > 0 ?
            comments?.map((comment) => (
              <div style={{display: 'flex', marginBottom:'10px'}}>
                <img src={comment.user.image} alt="" width="60px" height='60px' style={{borderRadius: '50%'}} />
                <div style={{marginLeft:'10px', width:'100%'}}>
                  <span style={{fontWeight: 600}}>{comment.user.userName}</span>
                  <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <span style={{display:'block', width:'90%'}} >{comment.content}</span>
                  </div>
                </div>
              </div>
            ))
          :
          <div>This post has no comments. Be the first to comment!</div>
        
        }  
        <div style={{display: 'flex', marginTop:'20px'}}>
          <img src={user?.image} alt="" width="60px" height='60px' style={{borderRadius: '50%'}} />
          <div style={{marginLeft:'10px', width:'100%'}}>
            <span style={{fontWeight: 600}}>{user?.userName}</span>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
              <input type="text" placeholder={(content == '') ? "Add a Comment..." : content} onChange={(e) => setContent(e.target.value)} style={{display:'block', border:'none', width:'90%'}} />
              <button onClick={() => commentAPost()} style={{border:'1px solid #00E5EB', borderRadius:'5px', background:'none', padding:'5px 15px 5px 15px', color:'#000', fontWeight: 600}}>Enter</button>
            </div>
          </div>
        </div>  
        </Modal.Body>
      </Modal>
  )
}
const mapStateToProps = state => ({
  
  auth: state.auth,
  user: state.user
})

ModalComments.propTypes = {
  addComment: propTypes.func.isRequired
}


export default connect(mapStateToProps, { addComment })(ModalComments);
