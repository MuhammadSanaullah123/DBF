import {
    ADD_CART_ERROR,
    ADD_CART_SUCCESS,
    USERS_ERROR,
    USERS_LOADED
} from '../actions/types'

const initialState = {
    
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: null,
    loading: true,
    user: null,
    users:null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        
        case ADD_CART_ERROR:
            return {
                ...state,
                token: sessionStorage.getItem('token'),
                isAuthenticated: true,
                loading: false
            }
        case ADD_CART_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case USERS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                users: payload
            }
            
        default:
            return state    
    }
}