const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "missing required name field"],
      minlength: 2,
      maxLength: 60,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/, // should be replaced by RFC2822 RegExp
      unique: true,
      required: [true, "missing required email field"],
    },
    phone: {
      type: String,
      required: [true, "missing required email field"],
      match: /^\+380[0-9]{9}$/,
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
      required: [true, "missing required password field"],
    },
    photo: {
      type: String,
    },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
