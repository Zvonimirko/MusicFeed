import { combineReducers } from "redux";
import alertReducer from "./reducers/alertReducer";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import postReducer from "./reducers/postReducer";

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
  postReducer,
});

export default rootReducer;
