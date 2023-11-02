import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import styles from './Checkout.module.css'
import productImg from '../../Images/feedProductImg1.png'
import clintImg from '../../Images/designderimg.png'
import Footer from '../Footer/Footer'
import { Navbar } from 'react-bootstrap'
import Navbar2 from '../Navbar2/Navbar2'
import round from '../../Images/round.png'
import { Link } from "react-router-dom";
// API
import { getPostByID } from "../../actions/posts"
// Components
import ModalCard from "./ModalCard"
// React Bootstrap
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// Redux
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"
// Spinner
import { RotatingLines } from  'react-loader-spinner'


const Checkout = ({auth: { loading, user }, posts: { post }}) => {
    const [show, setShow] = useState(false)
    const [selectedCard, setSelectedCard] = useState()
    const [showMoyasar, setShowMoyasar] = useState()

    useEffect(() => {
        const productID = Cookies.get('productID')
        
        store.dispatch(getPostByID(productID))
      
        // Moyasar
        // Load Moyasar script
        const script = document.createElement('script');
        script.src = 'https://cdn.moyasar.com/mpf/1.7.3/moyasar.js';
        script.async = true;
        document.body.appendChild(script);
        
        // When script is loaded, initialize Moyasar
        script.onload = () => {
            const Moyasar = window.Moyasar; // Get the Moyasar object from the window
    
            Moyasar.init({
            element: '.mysr-form',
            amount: post.price * 100,
            currency: 'USD',
            description: post.title,
            publishable_api_key: 'pk_test_GHigKEbVwtQcXEt4TsZxiERfTfAF3etGVG3wrNxD',
            callback_url: 'http://localhost:3000/thank-you',
            methods: ['creditcard'],
            });
        };
    }, [])

    
    const handleMoyasarPayment = () => {
        setShowMoyasar(true)
        
        
    }
    return (
    <>
      <div className={styles.checkoutOuter}>
        <Navbar2 />
        {loading  ? 
            <div style={{width:'100vw', textAlign:'center'}}>
                <RotatingLines
                    strokeColor="#00e5be"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="64"
                    visible={true}
                />
            </div>
            :
            <>
            <div className={styles.productArea}>
            <div className={styles.productImgArea}>
            <img src={post?.image} className={styles.productImg} alt="" />
            <div className={styles.productDesinger}>{post?.userName}</div>
            </div>
            <div className={styles.detailArea}>
                <div className={styles.productName}>{post?.title}</div>
                <div className={styles.productPrice}>${post?.price}</div>
                <div className={styles.solderby}>Sold by:</div>
                <div className={styles.soldername}>{post?.userName}</div>
            </div>
        </div>
        <div className={styles.sendToArea}>
            <div className={styles.deliverText}>Deliver to:</div>
            <div className={styles.customerDetail}>
                <img src={user?.image} className={styles.clienimgOutert} />
            
                <div className={styles.clintName}>{user?.firstName + " " + user?.lastName}</div>
                <div className={styles.address}>901 Highland StreetHavertown, PA 19083</div>
            </div>
            <div className={styles.recieveArea}>
                <div className={styles.getIT}>Get it by:</div>
                <div className={styles.recieveTime}>Expected 30 March 2003</div>
            </div>
            {/* Cards Not Needed */}
            {/* <div className={styles.cardsArea}>
                <div className={styles.deliverText}>Old Card Used:</div>
                <div className={styles.cards}>
                    <div className={styles.card1} >
                        <div className={styles.cardsInner}>
                            <div className={styles.yellowPert}></div>
                            <img src={round} className={styles.round} alt="" />
                        </div>
                        <div className={styles.cardsNumber}>****  ****  ****  8196</div>
                        <div className={styles.cardsOwner}>Robert Downy</div>
                        <div className={styles.cardExpri}>Exp 12/2050</div>
                    </div>
                    <div className={styles.card2}>
                        <div className={styles.csv}>
                            <div className={styles.csvText}>Type your CSV:</div>
                            <img src={round} className={styles.round} alt="" />
                        </div>
                        <input type="text" className={styles.csvInput} />
                    </div>
                    
                </div>
                <div className="mt-5" style={{border: '4px solid #D72A59', padding:'5px', borderRadius:'10px'}}>
                <table style={{padding:'10px'}}>
                    <thead>
                        <tr style={{color:'#00E5BE', fontSize:'25px'}}>
                            <th>Card Name</th>
                            <th>Card Number</th>
                            <th>Card Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user?.cards.map(item => {
                        return (
                            <tr>
                                
                            
                            
                                    <td style={{fontSize:'20px', paddingTop:'5px', paddingBottom:'5px'}} onClick={() => setSelectedCard(item)}>
                                        <Form.Check // prettier-ignore   
                                            type="radio"
                                            name="group1"
                                            id={`default-radio`}
                                            label={`${item.cardName}`}
                                            style={{color:'white'}}
                                        />
                                    </td>
                                
                                    <td style={{fontSize:'20px', paddingTop:'5px', paddingBottom:'5px', color:'white'}}>{item.cardNo}</td>
                                
                                    <td style={{fontSize:'20px', paddingTop:'5px', paddingBottom:'5px', color:'white'}}>{item.expiryMonth + "/" + item.expiryYear}</td>
                                
                        </tr>
                        )
                        
                    
                    })}
                    </tbody>
                </table>
                </div>
            </div> */}
            <div className={styles.cardBuutons}>
                {/* <button className={styles.button1} onClick={() => handleMoyasarPayment()}>Pay With Moyasar</button> */}
                
                <div className="mysr-form"></div>
                <ModalCard show={show} handleClose={() => setShow(false)} />
                {/* <button className={styles.button2}>Pay with Apply Pay</button> */}
            </div>
            {/* <div className={styles.costingdetail}>
                <div className={styles.deliverText}>How much will the item cost with:</div>
                <div className={styles.costingArea}>
                    <div className={styles.pricDetail}>
                        <div className={styles.detailText}>Tamara</div>
                        <div className={styles.priceDoll}>$234</div>
                    </div>
                    <div className={styles.pricDetail1}>
                        <div className={styles.detailText}>Tabby</div>
                        <div className={styles.priceDoll}>$23</div>
                    </div>
                </div>
            </div> */}
            {/* <Link to="/payment" className={styles.continuebutt}>Continue</Link> */}
        </div>
        </>
        }
        
        <Footer/>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    posts: state.posts,
    auth: state.auth,
    user: state.user
})
  
Checkout.propTypes = {
    // addComment: propTypes.func.isRequired
}

export default connect(mapStateToProps, null)(Checkout);