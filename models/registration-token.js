const { Schema, model } = require("mongoose");

const registrationTokenSchema = new Schema(
  {
    registrationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RegistrationToken = model("token", registrationTokenSchema);

module.exports = RegistrationToken;
