const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== ".png") {
      cb(new Error("Formato Incorrecto"), false);
    }

    cb(null, true);
  },
});
