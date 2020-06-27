const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUploadInput(data) {
  let errors = {};

  //Convert empty fields to an empty string so that we can use the validator functions.
  data.type = !isEmpty(data.type) ? data.type : "";

  //Type checks
  if (Validator.isEmpty(data.type)) {
    errors.type = "type field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};