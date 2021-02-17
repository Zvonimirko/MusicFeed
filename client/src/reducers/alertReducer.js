import { SET_ALERT, REMOVE_ALERT, REMOVE_ALERTS } from "../actions/types";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    case REMOVE_ALERTS:
      return initialState;
    default:
      return state;
  }
};

export default alertReducer;
