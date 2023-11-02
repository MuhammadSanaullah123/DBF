import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import styles from './DesignsSlider.module.css'
import cardsImg from '../../../Images/feedProductImg1.png'
// Redux
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../../store"
// Spinner
import { RotatingLines } from  'react-loader-spinner'
//API
import { getDesignsYouMayLike } from "../../../actions/posts"

const DesignsSlider = ({ posts: { loading, designsYouMayLike } }) => {
        useEffect(() => {
          store.dispatch(getDesignsYouMayLike())
        }, [])
        
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1350,
                  settings: {
                    slidesToShow: 4,
                  }
                },
                {
                  breakpoint: 780,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                    breakpoint: 440,
                    settings: {
                      slidesToShow: 1,
                    }
                  }
              ]
        };
        return (
            <div className={styles.slidesMian}>
                <div className={styles.designText}>Designs that you may like:</div>
                <Slider {...settings} className={styles.slidesArea}>
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
                        designsYouMayLike?.map((item) => (
                            <div className={styles.slidesCard} key={item?._id}>
                                <div className={styles.iamgArea}>
                                    <Link to={`/product/${item?._id}`}>
                                        <img src={item?.image} className={styles.cardsImg} alt="" />
                                        <div className={styles.designersNmae}>{item?.userName}</div>
                                    </Link>
                                </div>   
                                
                                <div className={styles.productName}>{item?.title}</div>
                                <div className={styles.productPrice}>${item?.price}</div>
                                
                            </div>
                        ))
                    }
                </Slider>
            </div>
        );
}

const mapStateToProps = state => ({
    designsYouMayLike: state.posts.designsYouMayLike,
    posts: state.posts,
})

export default connect(mapStateToProps, null)(DesignsSlider)