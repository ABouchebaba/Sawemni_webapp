import {
    GET_USERS,
    UPDATE_USER,
    USER_LOADING
  } from "../actions/types";
  import {
    NotificationContainer,
    NotificationManager
  } from "react-notifications";
  
  const initialState = {
    users: [],
    user: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false
        };
      case UPDATE_USER:
        NotificationManager.success(
          "Mise à jour éffectuée avec succés",
          "Mise à jour"
        );
        return {
          ...state,
          users: [
            action.payload,
            ...state.users.filter(user => user.id !== action.payload.id)
          ]
        };
      default:
        return state;
    }
  }
  