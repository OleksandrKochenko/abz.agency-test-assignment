const httpError = require("../helpers/http-error");
const User = require("../models/user");
const Position = require("../models/position");

const getUsers = async (req, res, next) => {
  try {
    const { page = 1, offset, count: limit = 5 } = req.query;
    const skip = offset ? offset : (page - 1) * limit;
    const users = await User.find({}, "-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total_users = await User.count();
    const total_pages = Math.ceil(total_users / limit);
    const currentPage = skip / limit + 1;
    const next_url =
      currentPage === total_pages
        ? null
        : `/api/users?page=${currentPage + 1}&count=${limit}`;
    const prev_url =
      currentPage === 1
        ? null
        : `/api/users?page=${currentPage - 1}&count=${limit}`;
    res.json({
      success: true,
      page: currentPage,
      total_pages,
      count: parseInt(limit),
      links: {
        next_url,
        prev_url,
      },
      users,
    });
  } catch (error) {
    next(error);
  }
};

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
  getUsers,
  findUserById,
  getPositions,
};
