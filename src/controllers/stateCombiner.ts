import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import studentReducer from "../reducers/studentReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "../reducers/userReducer";
const combinedReducers = combineReducers({
  student: studentReducer,
  user: userReducer,
});
const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
