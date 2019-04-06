import {
  ADD_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_LOADING
} from "../actions/types";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const initialState = {
  products: [],
  product: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case UPDATE_PRODUCT:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        products: [
          ...state.products.map(product => {
            if (product.id !== action.payload.id) {
              return product;
            } else {
              return action.payload;
            }
          })
        ]
      };
    case ADD_PRODUCT:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case DELETE_PRODUCT:
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        products: [
          ...state.products.filter(product => product.id !== action.payload)
        ]
      };
    default:
      return state;
  }
}
