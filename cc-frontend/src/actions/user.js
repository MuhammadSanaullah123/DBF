import React from 'react'
import { navigateTo } from '../hooks/navigationService';
// Alert
import Swal from "sweetalert2"
//axios
import axios from 'axios'
//components
import { Alert } from '../common/Alert';
//redux
import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
    ADD_CART_ERROR,
    ADD_CART_SUCCESS,
    USERS_ERROR,
    USERS_LOADED,
    FOLLOW_USER_ERROR,
    FOLLOW_USER_SUCCESS,
    CONVERSATIONS_LOADED,
    CONVERSATIONS_ERROR,
    CREATE_CONVERSATION_SUCCESS,
    CONVERSATION_LOADED,
    SEND_MESSAGE_ERROR,
    SEND_MESSAGE_SUCCESS
} from './types'
import setAuthToken from "../utils/setAuthToken"
import { Provider } from 'react-redux'

const BASE_URL = process.env.BASE_URL || 'http://localhost:6002'

export const uploadImage = (image) => async dispatch => {
    if(sessionStorage.token) {
        setAuthToken(sessionStorage.token)
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(image)
    
    try {
        const res = await axios.put(`${BASE_URL}/user/update-profile-image`, body, config)

        dispatch({
            type: UPLOAD_IMAGE_SUCCESS,
            payload: res.data
        });

        Swal.fire(`Image Uploaded`);
        
        setAuthToken(sessionStorage.token)
        
        navigateTo('/profiler/me');
        window.location.reload()

    } catch (err) {
        const errors = err?.response?.data?.errors

        if(errors) {
            errors.forEach(error => Swal.fire(`${error.msg}`))
        }

        dispatch({
            type: UPLOAD_IMAGE_ERROR
        });


    }
}

export const addToCart = (postID) => async dispatch => {
    if(sessionStorage.token) {
        setAuthToken(sessionStorage.token)
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    
    try {
        const res = await axios.put(`${BASE_URL}/user/add-to-cart/${postID}`, {}, config)

        dispatch({
            type: ADD_CART_SUCCESS,
            payload: res.data
        });

        Swal.fire(`Feed added to cart`);
        
        setAuthToken(sessionStorage.token)
        
        navigateTo('/feed');
        window.location.reload()

    } catch (err) {
        const errors = err?.response?.data?.errors

        if(errors) {
            errors.forEach(error => Swal.fire(`${error.msg}`))
        }

        dispatch({
            type: ADD_CART_ERROR
        });


    }
}

// Load User
export const getAllUsers = () => async dispatch => {
    // if(sessionStorage.token) {
    //     console.log('working?')
    //     setAuthToken(sessionStorage.token)
    // }
    try {
        const res = await axios.get(`${BASE_URL}/user/all`)
    
        dispatch({
            type: USERS_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: USERS_ERROR
        });
        
    }
}

export const getUserById = (userId) => async dispatch => { 
    if(sessionStorage.token) {
        console.log('working?')
        setAuthToken(sessionStorage.token)
    }
    try {
        const res = await axios.get(`${BASE_URL}/user/${userId}`)
    
        dispatch({
            type: USERS_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: USERS_ERROR
        });
        
    }
}


export const followUser = (userId) => async dispatch => {
    if(sessionStorage.token) {
        setAuthToken(sessionStorage.token)
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`${BASE_URL}/user/follow/${userId}`, {}, config)

        dispatch({
            type: FOLLOW_USER_SUCCESS,
            payload: res.data
        });

        Swal.fire('You are now following this user');

    } catch (err) {
        console.log("err", err)
        const errors = err?.response?.data?.errors
        console.log("errors", errors)
        if(errors) {
            console.log(errors)
            return errors.forEach(error => Swal.fire(`${error.msg}, "", "error"`))
        }

        dispatch({
            type: FOLLOW_USER_ERROR
        });

        return Swal.fire(err.response.data.error, "", "error")
    }
}

export const getConversationsByUserId = (userId) => async dispatch => {
    if(sessionStorage.token) {
        console.log('working?')
        setAuthToken(sessionStorage.token)
    }
    try {
        const res = await axios.get(`${BASE_URL}/user/conversation/${userId}`)
    
        dispatch({
            type: CONVERSATIONS_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: CONVERSATIONS_ERROR
        });
        
    }
}

export const createConversation = (obj) => async dispatch => {
    if(sessionStorage.token) {
        setAuthToken(sessionStorage.token)
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(obj)
    
    try {
        const res = await axios.post(`${BASE_URL}/user/create-conversation`, body, config)

        dispatch({
            type: CREATE_CONVERSATION_SUCCESS,
            payload: res.data
        });

        Swal.fire(`Image Uploaded`);
        
        setAuthToken(sessionStorage.token)
        console.log(res)
        navigateTo(`/message/${res.data._id}`);
        window.location.reload()

    } catch (err) {
        const errors = err?.response?.data?.errors

        if(errors) {
            errors.forEach(error => Swal.fire(`${error.msg}`))
        }

        dispatch({
            type: CONVERSATIONS_ERROR
        });


    }
}

export const getMessagesByConversationId = (conversationId) => async dispatch => {
    if(sessionStorage.token) {
        console.log('working?')
        setAuthToken(sessionStorage.token)
    }
    try {
        const res = await axios.get(`${BASE_URL}/user/message/${conversationId}`)
    
        dispatch({
            type: CONVERSATION_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: CONVERSATIONS_ERROR
        });
        
    }
}

export const sendAMessage = (obj) => async dispatch => {
    if(sessionStorage.token) {
        setAuthToken(sessionStorage.token)
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(obj)
    
    try {
        const res = await axios.post(`${BASE_URL}/user/message`, body, config)

        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: res.data
        });

        // Swal.fire(`Message Sent`);
        
        setAuthToken(sessionStorage.token)
        

    } catch (err) {
        const errors = err?.response?.data?.errors

        if(errors) {
            errors.forEach(error => Swal.fire(`${error.msg}`))
        }

        dispatch({
            type: SEND_MESSAGE_ERROR
        });


    }
}
