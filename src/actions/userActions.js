import axios from "axios";

import {
  UPDATE_USER,
  GET_ERRORS,
  GET_USER,
  CLEAR_ERRORS,
  GET_USERS,
  USER_LOADING,
  BAN_USER
} from "./types";

// Update user
export const updateUser = (id, fabData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/users/${id}`)
    .then(res => {
      //console.log(fabData);
      return dispatch({
        type: UPDATE_USER,
        payload: {
          ...fabData,
          id: id
        }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const banUser = id => dispatch => {
  dispatch(clearErrors());
  //console.log(id);
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/users/ban/${id}`)
    .then(res => {
      //console.log(res.data.id);
      return dispatch({
        type: BAN_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// Get users
export const getUsers = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/users`)
    .then(res => {
      //console.log(res);
      return dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

// Get user prices
export const getUserPrices = id => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/userprices/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};

// Set loading state
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
