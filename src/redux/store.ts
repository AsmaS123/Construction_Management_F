import { legacy_createStore as createStore } from "redux";
import { RolesInfoReducer } from "./reducer"; // Import your root reducer
// import loggerMiddleware from "./loggerMiddleware";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import { combineReducers } from "redux";

// export const store = createStore(rootReducer);

// const rootReducers = combineReducers({
//   rootReducer: rootReducer,
//   timetablereducer: timetablereducer,
//   attendanceReducer: attendanceReducer,
// });

// Create Redux store with middleware applied
export const store = createStore(
  RolesInfoReducer,
  applyMiddleware(thunk) // Apply middleware
);
