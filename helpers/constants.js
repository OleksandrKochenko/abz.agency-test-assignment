const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegExp = /^\+380[0-9]{9}$/;
const requiredMessage = "field required";
const invalidLenthMessage = "invalid field length";
const imageFormats = ["image/jpeg"]; // image formats could be extendet here

module.exports = {
  emailRegExp,
  phoneRegExp,
  requiredMessage,
  invalidLenthMessage,
  imageFormats,
};
