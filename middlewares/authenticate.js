const jwt = require("jsonwebtoken");
const httpError = require("../helpers/http-error");
const RegistrationToken = require("../models/registration-token");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(httpError(401, "Unauthorized request"));
  try {
    const { tokenId } = jwt.verify(token, SECRET_KEY);
    const tokenDoc = await RegistrationToken.findOne({ tokenId });
    if (!tokenDoc) next(httpError(401, "Unauthorized: not valid token"));
    await RegistrationToken.findOneAndDelete({ tokenId });
    next();
  } catch (error) {
    next(httpError(401, "Unauthorized: not valid token"));
  }
};

module.exports = authenticate;
