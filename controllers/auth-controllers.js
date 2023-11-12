const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const User = require("../models/user");
const RegistrationToken = require("../models/registration-token");

const registrationToken = async (req, res, next) => {
  try {
    const token = jwt.sign({ data: "registration" }, SECRET_KEY, {
      expiresIn: "40m",
    });
    await RegistrationToken.insertMany({ registrationToken: token });
    res.json({ success: "true", token });
  } catch (error) {
    next(error);
  }
};

const userRegistration = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email already in use");

    const hashedPswrd = await bcrypt.hash(password, 10);

    /* const avatarLink =
      avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + avatarSettings;
 */
    const newUser = await User.create({
      ...req.body,
      password: hashedPswrd,
      //avatarURL: avatarLink,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      //avatarURL: newUser.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationToken,
  userRegistration,
};
