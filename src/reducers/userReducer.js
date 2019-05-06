import {
  GET_USERS,
  UPDATE_USER,
  GET_USER,
  BAN_USER,
  USER_LOADING
} from "../actions/types";
import { NotificationManager } from "react-notifications";

const initialState = {
  users: [],
  user: {},
  userprices: [],
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
    case GET_USER:
      return {
        ...state,
        userprices: action.payload,
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
          ...state.products.map(product => {
            if (product.id !== action.payload.id) {
              return product;
            } else {
              return action.payload;
            }
          })
        ]
      };
    case BAN_USER:
      NotificationManager.success(
        "Utilisateur banni avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        users: [
          ...state.products.map(product => {
            if (product.id !== action.payload.id) {
              return product;
            } else {
              return action.payload;
            }
          })
        ]
      };
    default:
      return state;
  }
}
