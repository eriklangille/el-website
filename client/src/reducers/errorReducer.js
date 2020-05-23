import { GET_ERRORS } from "../actions/types";

const errorReducer = (state, action) => {
  switch (action.type) {
    case GET_ERRORS:
      console.log("Get errors!")
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;