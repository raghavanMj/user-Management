import { api, authApi } from "../../Api/api";
import {
  USER_LOGIN_REQUEST_FAIL,
  USER_LOGIN_REQUEST_SUCCESS,
  ERROR_ALERT,
  SUCCESS_ALERT,
  USER_REGISTER_REQUEST_FAIL,
  USER_REGISTER_REQUEST_SUCCESS,
  GET_USER_LIST_REQUEST_SUCCESS,
} from "../Constants/userConstants";

export const loginUser =
  (userEntry, navigate, setErrorAlert) => async (dispatch) => {
    try {
      const { data } = await api.post("/auth/login", userEntry);

      localStorage.setItem("userToken", JSON.stringify(data?.data[0]));
      dispatch({
        type: USER_LOGIN_REQUEST_SUCCESS,
        payload: data?.data[0],
      });
      navigate("/dashboard");
    } catch (error) {
      dispatch({
        type: USER_LOGIN_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setErrorAlert(true);
    }
  };

export const registerUser = (userEntry, navigate) => async (dispatch) => {
  try {
    const { data } = await api.post("/auth/register", userEntry);
    dispatch({
      type: USER_REGISTER_REQUEST_SUCCESS,
      payload: data,
    });
    navigate("/home");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserList = () => async (dispatch) => {
  try {
    const { data } = await api.get("/users/getuser");
    dispatch({
      type: GET_USER_LIST_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const errorState = (payload) => (dispatch) => {
  dispatch({
    type: ERROR_ALERT,
    payload: payload,
  });
};

export const successState = (payload) => (dispatch) => {
  dispatch({
    type: SUCCESS_ALERT,
    payload: payload,
  });
};
