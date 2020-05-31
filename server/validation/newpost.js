const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewPostInput(data) {
  let errors = {};

  //Convert empty fields to an empty string so that we can use the validator functions.
  data.Title = !isEmpty(data.Title) ? data.Title : "";
  data.URL = !isEmpty(data.URL) ? data.URL : "";
  data.ShortDescription = !isEmpty(data.ShortDescription) ? data.ShortDescription : "";
  data.Post = !isEmpty(data.Post) ? data.Post : "";

  const re = /[0-9A-Za-z-]+/g;

  //Title checks
  if (Validator.isEmpty(data.Title)) {
    errors.Title = "Title field is required";
  }

  //URL checks
  if (Validator.isEmpty(data.URL)) {
    errors.URL = "URL field is required.";
  } else if (!re.test(data.URL)) {
    errors.URL = "URL contains invalid characters";
  }

  //ShortDescription checks
  if (Validator.isEmpty(data.ShortDescription)) {
    errors.ShortDescription = "Short Description field is required";
  }

  //Post checks
  if (Validator.isEmpty(data.Post)) {
    errors.Post = "Post field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};