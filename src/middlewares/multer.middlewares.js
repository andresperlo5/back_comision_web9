const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  /*   storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/public");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const nombreImagen = `${file.fieldname}-${Date.now()}${ext}`;
      cb(null, nombreImagen);
    },
  }), */
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== ".png") {
      cb(new Error("Formato Incorrecto"), false);
    }

    cb(null, true);
  },
});
//timestamp
// nombre-12309218302103.ext
