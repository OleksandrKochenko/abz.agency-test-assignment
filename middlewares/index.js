const handleMongooseError = require("./handle-mongoose-error");
const validateUserRegistration = require("./validate-user-registration");
const isValidId = require("./validate-id");
const upload = require("./uploads");
const isValidImg = require("./validate-image");
const authenticate = require("./authenticate");

module.exports = {
  handleMongooseError,
  validateUserRegistration,
  isValidId,
  upload,
  isValidImg,
  authenticate,
};
