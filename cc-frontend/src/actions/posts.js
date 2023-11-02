import Swal from "sweetalert2";
//next
import { navigateTo } from "../hooks/navigationService";
//axios
import axios from "axios";
//components
import { Alert } from "../common/Alert";
//redux
import {
  POSTS_LOADED,
  TRENDING_POSTS_LOADED,
  POSTS_ERROR,
  DESIGN_OF_DAY_LOADED,
  DESIGN_OF_MONTH_LOADED,
  DESIGN_OF_YEAR_LOADED,
  POST_SUCCESS,
  POST_LOADED,
  POST_ERROR,
  LIKE_SUCCESS,
  LIKE_ERROR,
  COMMENT_ERROR,
  COMMENT_SUCCESS,
  DESIGNS_LOADED,
  MODELS_ERROR,
  MODELS_LOADED,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

const BASE_URL = process.env.BASE_URL || "http://localhost:6002";

//load posts
export const getTrendingPosts = () => async (dispatch) => {
  // if(localStorage.token) {
  //     setAuthToken(localStorage.token)
  // }
  try {
    const res = await axios.get(`${BASE_URL}/post/trending-posts`);

    dispatch({
      type: TRENDING_POSTS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

//Increase
export const timesPurchased = (id) => async (dispatch) => {
  // if(localStorage.token) {
  //     setAuthToken(localStorage.token)
  // }
  try {
    const res = await axios.put(`${BASE_URL}/post/timespurchased-post/${id}`);

    console.log(res);
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

export const getDesignOfDay = () => async (dispatch) => {
  // if(localStorage.token) {
  //     setAuthToken(localStorage.token)
  // }
  try {
    const res = await axios.get(`${BASE_URL}/post/design-of-day`);

    dispatch({
      type: DESIGN_OF_DAY_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

export const getDesignOfMonth = () => async (dispatch) => {
  // if(localStorage.token) {
  //     setAuthToken(localStorage.token)
  // }
  try {
    const res = await axios.get(`${BASE_URL}/post/design-of-month`);

    dispatch({
      type: DESIGN_OF_MONTH_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

export const getDesignOfYear = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/post/design-of-year`);

    dispatch({
      type: DESIGN_OF_YEAR_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/post/retrieve-all`);

    dispatch({
      type: POSTS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

export const getDesignsYouMayLike = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/post/designs-you-may-like`);

    dispatch({
      type: DESIGNS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

export const getTopModels = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/post/top-models`);

    dispatch({
      type: MODELS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MODELS_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

export const getPostByID = (postID) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/post/retrieve/${postID}`);

    dispatch({
      type: POST_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });

    Swal.fire(`${error}`);
  }
};

// Add post
export const addPost = (post) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(post);

  try {
    const res = await axios.post(`${BASE_URL}/post/create`, body, config);

    dispatch({
      type: POST_SUCCESS,
      payload: res.data,
    });

    Swal.fire(`Post created Successfully`);
    // navigateTo(`/project-setup/${res.data._id}`);
    window.location.reload();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: POSTS_ERROR,
    });

    Swal.fire("Post not created");
  }
};

// Add like
export const addLike = (postID) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(`${BASE_URL}/post/${postID}/like`, config);

    dispatch({
      type: LIKE_SUCCESS,
      payload: res.data,
    });

    Swal.fire(`Post liked Successfully`);
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: LIKE_ERROR,
    });

    Swal.fire("Post not liked");
  }
};

// Add comment
export const addComment = (obj) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = { content: obj.content };

  try {
    const res = await axios.put(
      `${BASE_URL}/post/${obj.postID}/comment`,
      body,
      config
    );

    dispatch({
      type: COMMENT_SUCCESS,
      payload: res.data,
    });

    Swal.fire(`You successfully commented on this post`);
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: COMMENT_ERROR,
    });

    Swal.fire("You failed to comment");
  }
};

// Add review
export const addReview = (data) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    rating: data.rating,
    review: data.review,
    image: data.image,
    userid: data.userid,
  };
  try {
    console.log(data);

    const res = await axios.put(
      `${BASE_URL}/post/review-post/${data.id}`,
      body,
      config
    );
    console.log(res);
    Swal.fire(`Review Successfull`);
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    Swal.fire("You failed to review");
  }
};

// Add review
export const getReviews = (id) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${BASE_URL}/post/review-post/${id}`,

      config
    );

    return res;
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }
  }
};

// delete campaign
// export const deleteCampaign = ({ id }) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     try {
//         const res = await axios.delete(`http://localhost:5000/api/campaign/${id}`, config)

//         dispatch({
//             type: CAMPAIGN_DELETE_SUCCESS,
//             payload: res.data
//         })

//         Alert('success', `Campaign Deleted Successfully`)

//     } catch (err) {
//         const errors = err.response.data.errors

//         if(errors) {
//             errors.forEach(error => Alert('error', `${error.msg}`))
//         }

//         dispatch({
//             type: CAMPAIGN_DELETE_FAIL
//         })

//         Alert('error', 'Campaign not deleted')
//     }
// }

// Get Campaign by ID
// export const getCampaignID = (id) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     try {
//         const res = await axios.get(`http://localhost:5000/api/campaign/${id}`, config)

//         dispatch({
//             type: CAMPAIGN_LOADED,
//             payload: res.data
//         })

//     } catch (err) {
//         const errors = err.response.data.errors

//         if(errors) {
//             errors.forEach(error => Alert('error', `${error.msg}`))
//         }

//         dispatch({
//             type: CAMPAIGN_ERROR
//         })
//         Alert('error', `${err}`)
//     }
// }
// update campagin
// export const updateCampaign = (id, object) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     const body = JSON.stringify(object)

//     try {
//         if (typeof window !== 'undefined') {
//             setAuthToken(localStorage.token)
//         } else {
//             setAuthToken(localStorage.token)
//         }
//         console.log("id",id)
//         const res = await axios.patch(`http://localhost:5000/api/campaign/${id}`, body, config)
//         console.log(res.data)
//         dispatch({
//             type: CAMPAIGN_UPDATED_SUCCESS,
//             payload: res.data
//         })

//         Alert('success', `Campaign updated Successfully`)

//     } catch (err) {
//         const errors = err.response.data.errors

//         if(errors) {
//             errors.forEach(error => Alert('error', `${error.msg}`))
//         }

//         dispatch({
//             type: CAMPAIGN_UPDATED_FAIL
//         })

//         Alert('error', 'Campaign not updated')
//     }
// }
