const sharp = require("sharp");
const fs = require("fs/promises");

const httpError = require("../helpers/http-error");
const { imageFormats } = require("../helpers/constants");

const isValidImg = async (req, res, next) => {
  const file = req.file;
  try {
    if (!file) {
      throw httpError(422, "file upload is required");
    }
    if (!imageFormats.includes(file.mimetype)) {
      throw httpError(422, "unsupported image type");
    }
    const image = await sharp(file.path);
    const metadata = await image.metadata();
    if (metadata.width < 70 || metadata.height < 70) {
      throw httpError(422, "invalid image resolution");
    }
    if (file.size > 5000000) {
      throw httpError(422, "the photo may not be greater than 5 Mbytes");
    }
    next();
  } catch (error) {
    file && (await fs.unlink(file.path));
    next(error);
  }
};

module.exports = isValidImg;
