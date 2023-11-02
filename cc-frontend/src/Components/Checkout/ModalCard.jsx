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
import { addCard } from "../../API/auth"

const ModalStories = ({ show, handleClose }) => {
  const [cardData, setCardData] = useState({
    cardNo: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: ''
  })
  console.log(cardData)

  const onSubmit = async () => {
    await addCard(cardData,
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log(error)
      }
    
      )
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Card</Modal.Title>
      </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control type="number" placeholder="Card Number" onChange={(e) => setCardData({...cardData, cardNo: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control type="text" placeholder="Name On Card" onChange={(e) => setCardData({...cardData, cardName: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" style={{justifyContent:'space-between', display:'flex'}} controlId="formGroupPassword">
              <Form.Control style={{width:'150px'}} type="text" placeholder="Expiry Month" onChange={(e) => setCardData({...cardData, expiryMonth: e.target.value})} />
              <Form.Control style={{width:'150px'}} type="text" placeholder="Expiry Year" onChange={(e) => setCardData({...cardData, expiryYear: e.target.value})} />
            </Form.Group>
          </Form>
          <Button style={{background: '#00E5BE', border:'#00E5BE'}} onClick={onSubmit}>Submit</Button>
        </Modal.Body>
      </Modal>
  )
}

export default ModalStories