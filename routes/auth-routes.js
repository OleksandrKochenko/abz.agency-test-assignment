const express = require("express");
const router = express.Router();
const { validateUserRegistration } = require("../middlewares");
const {
  userRegistration,
  registrationToken,
} = require("../controllers/auth-controllers");

router.get("/token", registrationToken);

router.post("/users", validateUserRegistration, userRegistration);

module.exports = router;
