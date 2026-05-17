const multer = require("multer");

const fs = require("fs");

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure file storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,

      Date.now() + "-" + file.originalname,
    );
  },
});

// Multer upload middleware
const upload = multer({
  storage,
});

module.exports = upload;
