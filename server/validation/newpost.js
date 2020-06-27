const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewPostInput(data) {
  let errors = {};

  //Convert empty fields to an empty string so that we can use the validator functions.
  data.Title = !isEmpty(data.Title) ? data.Title : "";
  data.URL = !isEmpty(data.URL) ? data.URL : "";
  data.ShortDescription = !isEmpty(data.ShortDescription) ? data.ShortDescription : "";
  data.Post = !isEmpty(data.Post) ? data.Post : "";

  //Title checks
  if (Validator.isEmpty(data.Title)) {
    errors.Title = "Title field is required";
  }

  //ShortDescription checks
  if (Validator.isEmpty(data.ShortDescription)) {
    errors.ShortDescription = "Short Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};