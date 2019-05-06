import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/admin/login`, userData)
    .then(res => {
      // Save to localStorage
      const { token, user } = res.data;
      /*console.log("info");
      console.log(token);
      console.log(user);*/

      // Set token to ls
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      // Set token to Auth header
      setAuthToken(token);
      // Set current user
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Product
export const logoutUser = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/admin/logout/${id}`)
    .then(res => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch(setCurrentUser({}));
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.data
      });
    });
};
// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
/* 
      localStorage.removeItem('jwtToken');
      setAuthToken(false);
      dispatch(setCurrentUser({}));
       
*/
