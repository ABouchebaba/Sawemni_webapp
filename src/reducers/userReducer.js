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
      //console.log(action.payload);
      return {
        ...state,
        users: [
          ...state.users.map(user => {
            if (user.idUser !== action.payload.idUser) {
              return user;
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
          ...state.users.map(user => {
            console.log(user.idUser + " " + action.payload.idUser);
            if (user.id != action.payload.idUser) {
              return user;
            } else {
              console.log("entered there");
              return action.payload;
            }
          })
        ]
      };
    default:
      return state;
  }
}
