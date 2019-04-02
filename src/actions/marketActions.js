import axios from "axios";

import {
  ADD_MARKET,
  UPDATE_MARKET,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_MARKET,
  GET_MARKETS,
  DELETE_MARKET,
  MARKET_LOADING
} from "./types";

// Add Product
export const addMarket = data => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/markets`, data)
    .then(res => {
      console.log(data);
      return dispatch({
        type: ADD_MARKET,
        payload: data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Product
export const updateMarket = (id, data) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/markets/${id}`, data)
    .then(res => {
      console.log(data);
      return dispatch({
        type: UPDATE_MARKET,
        payload: {
          ...data,
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

// Get Products
export const getMarkets = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/markets`)
    .then(res => {
      console.log(res);
      return dispatch({
        type: GET_MARKETS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_MARKETS,
        payload: null
      })
    );
};

// Get Product
export const getMarket = id => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/markets/${id}`)
    .then(res =>
      dispatch({
        type: GET_MARKET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MARKET,
        payload: null
      })
    );
};

// Delete Product
export const deleteMarket = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/markets/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_MARKET,
        payload: id
      })
    )
    .catch(err => {
      console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// Set loading state
export const setProductLoading = () => {
  return {
    type: MARKET_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
