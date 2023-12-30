const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/games");
  },
  filename: (req, file, cb) => {
    const fileNameWithoutExtension = path.parse(file.originalname).name;
    const uniqueFileName = fileNameWithoutExtension;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/gamefile", upload.single("gamefile"), (req, res) => {
  res.send("Game uploaded successfully!");
});

const db = require("./models");

//Routers
const fileRouter = require("./routes/FileUpload");
app.use("/file", fileRouter);

const gamefileRouter = require("./routes/GameUpload");
app.use("/gamefile", gamefileRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

const scoreRouter = require("./routes/GameScores");
app.use("/score", scoreRouter);

const scoreProfileRouter = require("./routes/GameScoresProfile");
app.use("/scores", scoreProfileRouter);

const gameRouter = require("./routes/Games");
app.use("/games", gameRouter);

const gameDelRouter = require("./routes/GameDelete");
app.use("/gamedel", gameDelRouter);

db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Server is running on port 3002...");
  });
});
