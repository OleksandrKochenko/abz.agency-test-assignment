const express = require("express");
const { isValidId } = require("../middlewares");
const {
  findUserById,
  getPositions,
} = require("../controllers/api-controllers");
const router = express.Router();

router.use("/users/:id", isValidId, findUserById);

router.use("/positions", getPositions);

module.exports = router;
