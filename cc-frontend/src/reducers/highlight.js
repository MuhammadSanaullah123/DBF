import {
    HIGHLIGHT_ERROR,
    HIGHLIGHT_LOADED,
    HIGHLIGHT_SUCCESS,
    // CAMPAIGN_SUCCESS,
    // CAMPAIGN_FAIL,
    // CAMPAIGN_UPDATED_SUCCESS,
    // CAMPAIGN_UPDATED_FAIL,
} from '../actions/types'

const initialState = {
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: true,
    highlights: null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        // case CAMPAIGN_SUCCESS:
        // case CAMPAIGN_UPDATED_SUCCESS:
        //     return {
        //         ...state,
        //         campaign: payload,
        //         isAuthenticated: true,
        //         loading: false
        //     }
        case HIGHLIGHT_ERROR:
            // localStorage.removeItem('token')
            return {
                ...state,
                // token: null,
                isAuthenticated: true,
                loading: false
            }
        // case CAMPAIGN_FAIL:
        // case CAMPAIGN_UPDATED_FAIL:
        //     return {
        //         ...state,
        //         token: null,
        //         isAuthenticated: false,
        //         loading: false
        //     }
        case HIGHLIGHT_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                highlights: payload
            }
            
        default:
            return state    
    }
}