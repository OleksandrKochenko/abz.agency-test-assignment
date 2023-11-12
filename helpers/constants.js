const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegExp = /^\+380[0-9]{9}$/;
const nameRequiredMessage = "missing required name field";
const emailRequiredMessage = "missing required email field";
const phoneRequiredMessage = "missing required phone field";
const pswrdRequiredMessage = "missing required password field";
const invalidLenthMessage = "invalid length of password";

module.exports = {
  emailRegExp,
  phoneRegExp,
  nameRequiredMessage,
  emailRequiredMessage,
  phoneRequiredMessage,
  pswrdRequiredMessage,
  invalidLenthMessage,
};
