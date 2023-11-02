import {
    STORY_SUCCESS,
    STORY_LOADED,
    STORY_ERROR,
    FRIENDS_STORY_SUCCESS,
    FRIENDS_STORY_ERROR
} from '../actions/types'

const initialState = {
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: true,
    loading: true,
    story: null,
    stories: null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case STORY_SUCCESS:
        // case CAMPAIGN_UPDATED_SUCCESS:
            return {
                ...state,
                story: payload,
                isAuthenticated: true,
                loading: false
            }
        case STORY_ERROR:
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
        case STORY_LOADED:
        case FRIENDS_STORY_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                stories: payload
            }
        
        default:
            return state    
    }
}