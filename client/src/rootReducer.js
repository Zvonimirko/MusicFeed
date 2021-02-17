import { combineReducers } from "redux";
import alertReducer from "./reducers/alertReducer";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
});

export default rootReducer;
