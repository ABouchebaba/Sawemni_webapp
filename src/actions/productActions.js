import axios from "axios";

import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_LOADING
} from "./types";

// Add Product
export const addProduct = fabData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/products`, fabData)
    .then(res => {
      console.log(fabData);
      return dispatch({
        type: ADD_PRODUCT,
        payload: fabData
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
export const updateProduct = (id, fabData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/products/${id}`, fabData)
    .then(res => {
      console.log(fabData);
      return dispatch({
        type: UPDATE_PRODUCT,
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

// Get Products
export const getProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/products`)
    .then(res => {
      console.log(res);
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: null
      })
    );
};

// Get Product
export const getProduct = id => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/products/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      })
    );
};

// Delete Product
export const deleteProduct = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/products/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
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
    type: PRODUCT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
