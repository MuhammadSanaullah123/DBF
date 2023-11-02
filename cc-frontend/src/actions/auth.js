import React from "react";
import Swal from "sweetalert2";
import { navigateTo } from "../hooks/navigationService";
//axios
import axios from "axios";
//components
import { Alert } from "../common/Alert";
//redux
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { Provider } from "react-redux";

const BASE_URL = process.env.BASE_URL || "http://localhost:6002";

export const getGoogleCallback = () => async (dispatch) => {
  // try {
  //     const response = await axios.get(`${BASE_URL}/user/auth/google/callback`)
  //     console.log(response)
  //     setAuthToken(response.token)
  //     window.location.href('http://localhost:3000')
  // } catch (error) {
  //     console.log(error)
  // }
};

// Load User
export const GetLoggedInUser = () => async (dispatch) => {
  // const navigate = useNavigate()
  if (sessionStorage.token) {
    console.log("working?");
    setAuthToken(sessionStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/user/me`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    console.log(error);
    navigateTo("/login");
    // window.location.reload()
  }
};

// Register User
export const register = ({
  confirmPassword,
  dateOfBirth,
  email,
  firstName,
  lastName,
  password,
  phoneNumber,
  state,
  terms,
  userName,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    confirmPassword,
    dateOfBirth,
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    state,
    terms,
    userName,
  });

  try {
    console.log("BEFIRE FIRING API");
    const res = await axios.post(
      "http://localhost:6002/user/signup",
      body,
      config
    );
    console.log("res");
    console.log(res);
    if (res.data.message === "user with this email already exists") {
      Swal.fire(`Email already exists`);
    } else {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      Swal.fire(`Registration Successful`);

      navigateTo("/login");
      window.location.reload();
    }
  } catch (err) {
    const errors = err?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Verify User
export const verification = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(
      `http://localhost:6002/user/verification/${token}`,
      config
    );

    Swal.fire(`Account verified`);

    navigateTo("/login");
    window.location.reload();
  } catch (err) {
    const errors = err?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const loginAuth = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${BASE_URL}/user/login`, body, config);
    if (res.data.message === "invalid password") {
      Swal.fire(`Invalid Credentials`);
    } else {
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      Swal.fire(`Login Successful`);
      // setAuthToken(res.data.token)
      sessionStorage.setItem("token", res.data.token);
      navigateTo("/");
      window.location.reload();
    }
  } catch (err) {
    const errors = err?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: LOGIN_FAIL,
    });

    navigateTo("/login");
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });

  navigateTo("/login");
  window.location.reload();
};
