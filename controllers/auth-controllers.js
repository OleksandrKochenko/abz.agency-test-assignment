const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const tinify = require("tinify");
const fs = require("fs/promises");
const cloudinary = require("../helpers/cloudinary");
require("dotenv").config();
const { SECRET_KEY, TINIFY_API_KEY } = process.env;

const User = require("../models/user");
const Position = require("../models/position");
const RegistrationToken = require("../models/registration-token");
const httpError = require("../helpers/http-error");

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
    const { body, file } = req;

    const existedUser = await User.findOne({
      $or: [{ email: body.email }, { phone: body.phone }],
    });
    if (existedUser)
      throw httpError(409, "User with this phone or email already exist");

    tinify.key = TINIFY_API_KEY;
    const source = tinify.fromFile(file.path);
    const resized = source.resize({
      method: "cover",
      width: 70,
      height: 70,
    });
    await resized.toFile(file.path);

    const fileData = await cloudinary.uploader.upload(file.path, {
      folder: "users",
    });
    const photo = fileData.url;
    await fs.unlink(file.path);

    const password = await bcrypt.hash(body.password, 10);

    const { title } = await Position.findById(body.position_id);

    const { _id: user_id } = await User.create({
      ...body,
      photo,
      password,
      position: title,
    });

    res.status(201).json({
      success: true,
      user_id,
      message: "New user successfully registered",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationToken,
  userRegistration,
};
