import Swal from "sweetalert2";
//next
import { navigateTo } from "../hooks/navigationService";
//axios
import axios from "axios";
//components
import { Alert } from "../common/Alert";
//redux
import {
  STORY_LOADED,
  STORY_SUCCESS,
  STORY_ERROR,
  FRIENDS_STORY_SUCCESS,
  FRIENDS_STORY_ERROR,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

const BASE_URL = process.env.BASE_URL || "http://localhost:6002";

// Load all stories
export const getAllStories = () => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  try {
    const res = await axios.get(`${BASE_URL}/user/retrieve-all`);

    dispatch({
      type: STORY_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: STORY_ERROR,
    });
    console.log(error);
  }
};

// Add story
export const addStory = (story) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(story);

  try {
    const res = await axios.post(`${BASE_URL}/story/create`, body, config);

    dispatch({
      type: STORY_SUCCESS,
      payload: res.data,
    });

    Swal.fire(`Story created Successfully`);
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: STORY_ERROR,
    });

    Swal.fire("Story not created");
  }
};

export const getFriendsStory = () => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${BASE_URL}/user/auth/stories`, config);

    dispatch({
      type: FRIENDS_STORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: FRIENDS_STORY_ERROR,
    });

    Swal.fire("Stories not fetched");
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
