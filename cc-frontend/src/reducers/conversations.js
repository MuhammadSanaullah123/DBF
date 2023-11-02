import {
    CONVERSATIONS_ERROR,
    CONVERSATIONS_LOADED,
    CONVERSATION_LOADED
} from '../actions/types'

const initialState = {
    
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: null,
    conversationLoading: true,
    conversation: null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        
        case CONVERSATIONS_LOADED:
        case CONVERSATION_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                conversationLoading: false,
                conversation: payload
            }
            
        default:
            return state    
    }
}