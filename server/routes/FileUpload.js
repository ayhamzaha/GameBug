const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileStorageEngineImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngineImage });

router.post("/single", upload.single("image"), (req, res) => {
  res.send("Image uploaded successfully!");
});

module.exports = router;
