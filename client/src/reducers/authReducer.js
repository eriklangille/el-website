import {
  SET_CURRENT_USER,
  USER_LOADING,
} from "../actions/types";

const isEmpty = require("is-empty");

export const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const authReducer = (state, action) => {
  console.log("authReducer ", action)
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
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