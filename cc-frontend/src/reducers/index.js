import { combineReducers } from 'redux'
import auth from "./auth"
import posts from "./posts"
import stories from "./stories"
import user from "./user"
import order from "./order"
import conversations from "./conversations"

export default combineReducers({
    auth, posts, stories, user, order, conversations
})