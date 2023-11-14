const Joi = require("joi");
const fs = require("fs/promises");

const {
  requiredMessage,
  invalidLenthMessage,
  emailRegExp,
  phoneRegExp,
} = require("../helpers/constants");
const httpError = require("../helpers/http-error");

const userRegistrationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({
      "any.required": `name ${requiredMessage}`,
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  email: Joi.string()
    .min(2)
    .max(100)
    .pattern(emailRegExp)
    .required()
    .messages({
      "any.required": `email ${requiredMessage}`,
      "string.pattern.base": `invalid email`,
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .required()
    .messages({
      "any.required": `phone ${requiredMessage}`,
      "string.pattern.base": `invalid phone`,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": `password ${requiredMessage}`,
      "string.min": `${invalidLenthMessage}`,
    }),
  position_id: Joi.string()
    .required()
    .messages({
      "any.required": `position_id ${requiredMessage}`,
    }),
});

const validateUserRegistration = async (req, res, next) => {
  try {
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
      throw httpError(422, error.message);
    }
    next();
  } catch (error) {
    const { file } = req;
    file && (await fs.unlink(file.path));
    next(error);
  }
};

module.exports = validateUserRegistration;
