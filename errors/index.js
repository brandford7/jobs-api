const UnAuthenticatedError = require("./unauthenticated");
const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-error");
const NotFoundError  = require("./not-found");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
};
