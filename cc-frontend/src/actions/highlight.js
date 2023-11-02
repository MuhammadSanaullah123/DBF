import Swal from "sweetalert2";
//next
import { navigateTo } from "../hooks/navigationService";
//axios
import axios from "axios";
//components
import { Alert } from "../common/Alert";
//redux
import {
  HIGHLIGHT_LOADED,
  HIGHLIGHT_SUCCESS,
  HIGHLIGHT_ERROR,
  ADD_STORY_HIGHLIGHT_SUCCESS,
  ADD_STORY_HIGHLIGHT_ERROR,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

const BASE_URL = process.env.BASE_URL || "http://localhost:6002";

// Load all stories
export const getAllHighlights = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/highlight/retrieve-all`);

    dispatch({
      type: HIGHLIGHT_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HIGHLIGHT_ERROR,
    });
    console.log(error);
  }
};

// Add story to highlight
export const addStoryToHighlight = ({ highlightId, storyId }) => async (
  dispatch
) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `${BASE_URL}/highlight/${highlightId}/stories/${storyId}`,
      {},
      config
    );

    dispatch({
      type: ADD_STORY_HIGHLIGHT_SUCCESS,
      payload: res.data,
    });

    Swal.fire(`Highlight created Successfully`);
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal(`${error.msg}`));
    }

    dispatch({
      type: HIGHLIGHT_ERROR,
    });

    Swal.fire("Highlight not created");
  }
};

// Add story
export const addHighlight = (highlight) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  console.log(highlight);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(highlight);

  try {
    const res = await axios.post(`${BASE_URL}/highlight/create`, body, config);

    dispatch({
      type: ADD_STORY_HIGHLIGHT_SUCCESS,
      payload: res.data,
    });

    Swal.fire(`Story added to highlight`);
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: ADD_STORY_HIGHLIGHT_ERROR,
    });

    Swal.fire("Story not added to highlight");
  }
};

// Delete Highlight
export const deleteHighlight = (id) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(
      `${BASE_URL}/highlight/delete/${id}`,
      config
    );

    /* dispatch({
            type: ADD_STORY_HIGHLIGHT_SUCCESS,
            payload: res.data
        }) */

    Swal.fire(`Highlight Removed`);
    window.location.reload();
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    /*   dispatch({
            type: ADD_STORY_HIGHLIGHT_ERROR
        }) */

    Swal.fire(`Highlight not Removed`);
  }
};

// Get loggged in user Highlight
export const getHighlights = () => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${BASE_URL}/highlight/retrieve-me/`, config);
    console.log(res);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    /*   dispatch({
              type: ADD_STORY_HIGHLIGHT_ERROR
          }) */
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
