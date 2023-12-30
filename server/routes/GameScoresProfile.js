const express = require("express");
const router = express.Router();
const { GameScores } = require("../models");

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const listGameScores = await GameScores.findAll({
    where: { username: username },
  });
  return res.json(listGameScores);
});

module.exports = router;
