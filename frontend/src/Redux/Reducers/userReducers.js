import {
  USER_LOGIN_REQUEST_FAIL,
  USER_LOGIN_REQUEST_SUCCESS,
  ERROR_ALERT,
  SUCCESS_ALERT,
  USER_REGISTER_REQUEST_FAIL,
  USER_REGISTER_REQUEST_SUCCESS,
  GET_USER_LIST_REQUEST_SUCCESS,
} from "../Constants/userConstants";

const initialState = {
  userInfo: null,
  errorAlert: null,
  successAlert: null,
  usersList: [],
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        errorAlert: null,
        successAlert: "Login Successfully",
      };
    case USER_LOGIN_REQUEST_FAIL:
      return { ...state, errorAlert: action.payload, successAlert: null };
    case USER_REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        errorAlert: null,
        successAlert: "Register Successfully",
      };
    case USER_REGISTER_REQUEST_FAIL:
      return { ...state, errorAlert: action.payload, successAlert: null };
    case GET_USER_LIST_REQUEST_SUCCESS:
      return { ...state, usersList: action.payload };
    case ERROR_ALERT:
      return { ...state, errorAlert: action.payload };
    case SUCCESS_ALERT:
      return { ...state, successAlert: action.payload };
    default:
      return state;
  }
};
