const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileStorageEngineGame = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/games");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngineGame });

router.post("/game", upload.single("game"), (req, res) => {
  res.send("Game uploaded successfully!");
});

module.exports = router;
