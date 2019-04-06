import {
  ADD_MARKET,
  GET_MARKETS,
  GET_MARKET,
  UPDATE_MARKET,
  DELETE_MARKET,
  MARKET_LOADING
} from "../actions/types";
import {
  NotificationManager
} from "react-notifications";

const initialState = {
  markets: [],
  market: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MARKET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MARKETS:
      return {
        ...state,
        markets: action.payload,
        loading: false
      };
    case GET_MARKET:
      return {
        ...state,
        market: action.payload,
        loading: false
      };
    case UPDATE_MARKET:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        markets: [
          action.payload,
          ...state.markets.filter(market => market.id !== action.payload.id)
        ]
      };
    case ADD_MARKET:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        markets: [action.payload, ...state.markets]
      };
    case DELETE_MARKET:
      console.log(action.payload);
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        markets: state.markets.filter(market => market.id !== action.payload)
      };
    default:
      return state;
  }
}
