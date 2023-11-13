const express = require("express");
const { isValidId } = require("../middlewares");
const {
  findUserById,
  getPositions,
  getUsers,
} = require("../controllers/api-controllers");
const router = express.Router();

router.get("/users", getUsers);

router.get("/users/:id", isValidId, findUserById);

router.get("/positions", getPositions);

module.exports = router;
