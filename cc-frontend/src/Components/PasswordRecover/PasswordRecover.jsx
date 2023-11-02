import React from 'react'
import styles from './PasswordRecover.module.css'
import webImg from '../../Images/webImg.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import done from '../../Images/done.png'



function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className={styles.bodies}>
                <img src={done} className={styles.done} alt="" />
                <div className={styles.emailSent}>Email sent successfully</div>
            </Modal.Body>
        </Modal>
    );
}


const PasswordRecover = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className={styles.mainOuter}>
                <div className={styles.itemsArea}>
                    <img src={webImg} className={styles.webImg} alt="" />
                    <div className={styles.forgetText}>Forget Password</div>
                    <input type="email" placeholder='Username, Email Address or Phone Number' className={styles.recoverEmail} />
                    <button className={styles.continue} onClick={() => setModalShow(true)}>Continue</button>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </>
    )
}

export default PasswordRecover
