import {
  TRENDING_POSTS_LOADED,
  DESIGN_OF_DAY_LOADED,
  DESIGN_OF_MONTH_LOADED,
  DESIGN_OF_WEEK_LOADED,
  DESIGN_OF_YEAR_LOADED,
  POSTS_ERROR,
  POSTS_LOADED,
  POST_LOADED,
  DESIGNS_LOADED,
  MODELS_ERROR,
  MODELS_LOADED,
} from "../actions/types";

const initialState = {
  token:
    typeof window !== "undefined" ? sessionStorage.getItem("token") : false,
  isAuthenticated: true,
  loading: true,
  trendingPosts: null,
  designOfDay: null,
  designOfMonth: null,
  designOfYear: null,
  posts: null,
  post: null,
  designsYouMayLike: null,
  designsCustomerLiked: null,
  models: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case CAMPAIGN_SUCCESS:
    // case CAMPAIGN_UPDATED_SUCCESS:
    //     return {
    //         ...state,
    //         campaign: payload,
    //         isAuthenticated: true,
    //         loading: false
    //     }
    case POSTS_ERROR:
    case MODELS_ERROR:
      // localStorage.removeItem('token')
      return {
        ...state,
        // token: null,
        isAuthenticated: true,
        loading: false,
      };
    case TRENDING_POSTS_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        trendingPosts: payload,
      };
    case DESIGN_OF_DAY_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        designOfDay: payload,
      };
    case DESIGN_OF_WEEK_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        designOfWeek: payload,
      };
    case DESIGN_OF_MONTH_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        designOfMonth: payload,
      };
    case DESIGN_OF_YEAR_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        designOfYear: payload,
      };
    case POSTS_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        posts: payload,
      };
    case POST_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        post: payload,
      };
    case DESIGNS_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        designsYouMayLike: payload,
      };
    case MODELS_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        models: payload,
      };

    default:
      return state;
  }
}
