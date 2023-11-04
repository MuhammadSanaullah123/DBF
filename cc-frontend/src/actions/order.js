import Swal from "sweetalert2";
//next
import { navigateTo } from "../hooks/navigationService";
//axios
import axios from "axios";
//components
import { Alert } from "../common/Alert";
//redux
import { CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS } from "./types";

import setAuthToken from "../utils/setAuthToken";

const BASE_URL = process.env.BASE_URL || "http://localhost:6002";

// Create order
export const createOrder = (obj) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(obj);

  try {
    const res = await axios.post(`${BASE_URL}/order/create`, obj, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: res.data,
    });

    Swal.fire(`Order created Successfully`);
    // navigateTo(`/project-setup/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => Swal.fire(`${error.msg}`));
    }

    dispatch({
      type: CREATE_ORDER_ERROR,
    });

    Swal.fire("Order not created");
  }
};
