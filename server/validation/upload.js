const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewPostInput(data) {
  let errors = {};

  //Convert empty fields to an empty string so that we can use the validator functions.
  data.Title = !isEmpty(data.Title) ? data.Title : "";

  //Post checks
  if (Validator.isEmpty(data.Post)) {
    errors.Post = "Post field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};