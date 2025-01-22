import { combineReducers } from "redux";
import authReducer from "../reducers/authSlice";
const appReducer = combineReducers({
  auth:authReducer
});

const  rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};


export default rootReducer