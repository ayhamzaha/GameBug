const express = require("express");
const router = express.Router();
const { Games } = require("../models");

router.post("/", async (req, res) => {
  const { gametitle, gameinfo, tolink, gameImage, gamefile } = req.body;
  await Games.create({
    gametitle,
    gameinfo,
    tolink,
    gameImage,
    gamefile,
  });
  return res.json("Game added");
});

router.get("/", async (req, res) => {
  const listOfGames = await Games.findAll();
  res.json(listOfGames);
});

router.get("/:gametitle", async (req, res) => {
  const tolink = req.params.tolink;
  const game = await Games.findAll({ where: { tolink: tolink } });
  const title = game.gametitle;
  return res.json(title);
});

module.exports = router;
