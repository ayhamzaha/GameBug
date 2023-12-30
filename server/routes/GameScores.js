const express = require("express");
const router = express.Router();
const { GameScores } = require("../models");

router.post("/", async (req, res) => {
  const { scores, gameTitle, username } = req.body;
  await GameScores.create({ scores, gameTitle, username });
  return res.json("Score recorded");
});
router.get("/:gameTitle", async (req, res) => {
  const title = req.params.gameTitle;
  const listofgame = await GameScores.findAll({ where: { gameTitle: title } });
  return res.json(listofgame);
});

module.exports = router;
