const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");
const {
  emailRegExp,
  phoneRegExp,
  requiredMessage,
} = require("../helpers/constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, requiredMessage],
      minlength: 2,
      maxLength: 60,
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, requiredMessage],
      minlength: 2,
      maxLength: 100,
    },
    phone: {
      type: String,
      required: [true, requiredMessage],
      match: phoneRegExp,
    },
    position: {
      type: String,
    },
    position_id: {
      type: Schema.Types.ObjectId,
      ref: "position",
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, requiredMessage],
    },
    photo: {
      type: String,
    },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
