const { Schema, model } = require("mongoose");

const positionSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Position = model("position", positionSchema);

module.exports = Position;
