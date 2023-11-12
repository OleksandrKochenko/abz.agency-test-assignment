const httpError = require("../helpers/http-error");
const User = require("../models/user");
const Position = require("../models/position");

const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(
      id,
      {},
      {
        projection: { email: 1, name: 1, phone: 1, position: 1, photo: 1 },
      }
    );

    if (!user) {
      throw httpError(404, `User with id ${id} not found`);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getPositions = async (req, res, next) => {
  try {
    const positions = await Position.find({}, "title");
    res.json({ success: true, positions });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findUserById,
  getPositions,
};
