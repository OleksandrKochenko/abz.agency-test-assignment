const express = require("express");
const {
  validateUserRegistration,
  upload,
  isValidImg,
  authenticate,
} = require("../middlewares");
const {
  userRegistration,
  registrationToken,
} = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/token", registrationToken);

router.post(
  "/users",
  authenticate,
  upload.single("photo"),
  isValidImg,
  validateUserRegistration,
  userRegistration
);

module.exports = router;
