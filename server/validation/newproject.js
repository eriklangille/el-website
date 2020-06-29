const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewProjectInput(data) {
  let errors = {};

  //Convert empty fields to an empty string so that we can use the validator functions.
  data.Title = !isEmpty(data.Title) ? data.Title : "";
  data.ShortDescription = !isEmpty(data.ShortDescription) ? data.ShortDescription : "";

  const re = /[0-9A-Za-z-]+/g;

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