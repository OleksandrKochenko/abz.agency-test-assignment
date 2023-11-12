const Joi = require("joi");
const {
  nameRequiredMessage,
  invalidLenthMessage,
  emailRegExp,
  emailRequiredMessage,
  pswrdRequiredMessage,
  phoneRegExp,
  phoneRequiredMessage,
} = require("../helpers/constants");
const httpError = require("../helpers/http-error");

const userRegistrationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({
      "any.required": `${nameRequiredMessage}`,
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  email: Joi.string()
    .min(2)
    .max(100)
    .pattern(emailRegExp)
    .required()
    .messages({
      "any.required": `${emailRequiredMessage}`,
      "string.pattern.base": `invalid email`,
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .required()
    .messages({
      "any.required": `${phoneRequiredMessage}`,
      "string.pattern.base": `invalid phone`,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": `${pswrdRequiredMessage}`,
      "string.min": `${invalidLenthMessage}`,
    }),
  position_id: Joi.string().required(),
  photo: Joi.string().required(), //
});

const validateUserRegistration = (req, res, next) => {
  const { error } = userRegistrationSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
};

module.exports = validateUserRegistration;
