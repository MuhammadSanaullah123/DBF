import React, { useState, useEffect } from 'react'
// React Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
// API
import { addStory } from '../../../actions/story'
//redux
import store from "../../../store"
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

const ModalBank = ({ addStory , showBank, handleCloseBank}) => {
  const [story, setStory] = useState({
    text: '',
    image: ''
  })

  const onSubmit = () => {
    handleCloseBank()
  }
  return (
    <Modal
        show={showBank}
        onHide={handleCloseBank}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Attach Bank Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form>
            
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label style={{fontSize:'20px', color: '#00E5BE'}}>IBAN</Form.Label>
              <Form.Control type="text" placeholder="IBAN Number" onChange={(e) => setStory({...story, text: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label style={{fontSize:'20px', color: '#00E5BE'}}>Account Name</Form.Label>
              <Form.Control type="text" placeholder="Account name" onChange={(e) => setStory({...story, text: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label style={{fontSize:'20px', color: '#00E5BE'}}>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Mobile Number" onChange={(e) => setStory({...story, text: e.target.value})} />
            </Form.Group>
          </Form>
          <Button style={{background: '#00E5BE', border:'#00E5BE'}} onClick={onSubmit}>Submit</Button>
        </Modal.Body>
        
      </Modal>
  )
}

ModalBank.propTypes = {
  addStory: propTypes.func.isRequired
}

export default connect(null, { addStory })(ModalBank);