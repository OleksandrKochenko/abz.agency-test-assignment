const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const tinify = require("tinify");
require("dotenv").config();
const { SECRET_KEY, TINIFY_API_KEY } = process.env;

const User = require("../models/user");
const RegistrationToken = require("../models/registration-token");

const registrationToken = async (req, res, next) => {
  try {
    const tokenId = nanoid();
    const payload = { tokenId };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "40m",
    });
    await RegistrationToken.insertMany({ registrationToken: token, tokenId });
    res.json({ success: "true", token });
  } catch (error) {
    next(error);
  }
};

const userRegistration = async (req, res, next) => {
  try {
    const body = req.body;
    const file = req.file;

    tinify.key = TINIFY_API_KEY;
    const source = tinify.fromFile(file.path);
    const resized = source.resize({
      method: "cover",
      width: 70,
      height: 70,
    });
    const newPath = file.destination + "\\" + "thumb_" + file.filename;
    resized.toFile(newPath);

    /* const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email already in use");

    const hashedPswrd = await bcrypt.hash(password, 10); */

    /* const avatarLink =
      avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + avatarSettings;
 */
    /* const newUser = await User.create({
      ...req.body,
      password: hashedPswrd, */
    //avatarURL: avatarLink,
    /* }); */

    res.status(201).json({
      body,
      file,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationToken,
  userRegistration,
};
