import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// CSS
import styles from './Payment.module.css'
import Navbar2 from '../Navbar2/Navbar2'
import cardImg from '../../Images/feedProductImg1.png'
import PaymentSlider from './PaymentSlider/PaymentSlider'
import centerImg from '../../Images/HomebottomImg.png'
// Assets
import visa1 from '../../Images/visa1.png'
import visa2 from '../../Images/visa2.png'
import visa3 from '../../Images/visa3.png'
import visa4 from '../../Images/visa4.png'
import visa5 from '../../Images/visa5.png'
import Footer from '../Footer/Footer'
import cross from '../../Images/cross.png'
//API
import { getUser, removeCart } from "../../API/auth"
// Redux
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"
// Spinner
import { RotatingLines } from  'react-loader-spinner'

import Swal from "sweetalert2"




const Payment = ({auth: {loading, user}}) => {
    const [cart, setCart] = useState()
    const [posts, setPosts] = useState()
    const [total, setTotal] = useState(0)
    const [hasRunOnce, setHasRunOnce] = useState(false)

    const navigate = useNavigate()
    let tempUser = user
    let totalTemp = 0
        for(let i = 0; i < user?.cart.length; i++) {
            totalTemp = totalTemp + user?.cart[i].post.price
            console.log(':0')
        }
    
    // useEffect(async () => {
        // Moyasar
        // Load Moyasar script
        const script = document.createElement('script');
        script.src = 'https://cdn.moyasar.com/mpf/1.7.3/moyasar.js';
        script.async = true;
        document.body.appendChild(script);
        if(totalTemp != 0) {
            // When script is loaded, initialize Moyasar
            script.onload = () => {
                const Moyasar = window.Moyasar; // Get the Moyasar object from the window
        
                Moyasar.init({
                element: '.mysr-form',
                amount: totalTemp * 100,
                currency: 'USD',
                description: 'Checkout',
                publishable_api_key: 'pk_test_GHigKEbVwtQcXEt4TsZxiERfTfAF3etGVG3wrNxD',
                callback_url: 'http://localhost:3000/thank-you',
                methods: ['creditcard'],
                });
            };
        }
        
    // }, [])
        
    const removeFromCart = async (itemID) => {
        await removeCart(itemID,
            (res) => {
              Swal.fire(res.message)
            },
            (error) => {
              Swal.fire(error?.response?.data.error)
            }
        )
        const tempCart = cart.filter((item) => item._id !== itemID)
        console.log("cart after removal", cart)
        setCart(tempCart)
        
        if((cart.length - 1) == 0) {
            navigate('/feed')
        }
    }
    
    const moyasar = async () => {
        
    }

    return (
    <>
      <div className={styles.paymentOuter}>
        <Navbar2/>
        <div className={styles.LocationInformat}>
            <div className={styles.locationTexts}>
                <div className={styles.LocationText}>Location:</div>
                <div className={styles.addressDetail}>901 Highland StreetHavertown, PA 19083</div>
            </div>
            <button className={styles.buttonconfirm}>Confirm</button>
        </div>
        <div className={styles.itemsArea}>
            <div className={styles.LocationText}>Your Items:</div>
            <div className={styles.itemsCardArea}>
                {loading ? 
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
                user.cart?.map((item) => (
                    <div className={styles.itemsCard}>
                        <div className={styles.imageArea}>
                            <img src={item.post.image} className={styles.cardImg} alt="" />
                            <div className={styles.designername}>{item.post.userName}</div>
                            <img src={cross} className={styles.cross} alt="" onClick={() => removeFromCart(item._id)} />
                        </div>
                        <div className={styles.productName}>{item.post.title}</div>
                        <div className={styles.priceItem}>${item.post.price}</div>
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.getItArea}>
            <div className={styles.LocationText}>Get it by:</div>
            <div className={styles.expectedText}>Expected 30 March 2003</div>
        </div>
        <PaymentSlider posts={posts} />
        <div className={styles.centerImage}>
            <img src={centerImg} className={styles.centImage} alt="" />
        </div>
        <div className={styles.inputsArea}>
            <input type="text" className={styles.coupnInput} placeholder='Enter Coupon Code' />
            <button className={styles.applyButton}>Apply</button>
        </div>
        {loading ? 
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
        <div className={styles.totalArea}>
            <div className={styles.subTotal}>
                <div className={styles.subHeading}>Subtotal</div>
                <div className={styles.priceHeading}>${totalTemp || 0}</div>
            </div>
            <div className={styles.subTotal}>
                <div className={styles.subHeading}>Shipping Fee</div>
                <div className={styles.priceHeading}>$0</div>
            </div>
            <div className={styles.subTotal}>
                <div className={styles.subHeading}>Total</div>
                <div className={styles.priceHeading}>${totalTemp || 0}</div>
            </div>
            <div className={styles.cardsImges}>
                <img src={visa1}  alt="" className={styles.visa1} />
                <img src={visa2}  alt="" className={styles.visa2} />
                <img src={visa3}  alt="" className={styles.visa3} />
                <img src={visa4}  alt="" className={styles.visa4} />
                <img src={visa5}  alt="" className={styles.visa5} />
            </div>
        </div>
}
        {/* <div className={styles.buttonsParent}>
            <div className={styles.buttonWrapper}>
                <button className={styles.checkout}>Checkout with Tabby</button>
                <button className={styles.checkOut} onClick={() => moyasar()}>Checkout with Moyasar</button>
                <button className={styles.checkout}>Checkout with Tamara</button>
            </div>
        </div> */}
        <div className="mysr-form"></div>
        <Footer />
      </div>
    </>
  )
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
 })
 
export default connect(mapStateToProps, null)(Payment)
