import {
  SET_CURRENT_USER,
  USER_LOADING,
} from "../actions/types";

const isEmpty = require("is-empty");

const authReducer = (state, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default authReducer;