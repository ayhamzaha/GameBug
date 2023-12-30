const express = require("express");
const router = express.Router();
const { Games } = require("../models");
const { GameScores } = require("../models");

router.delete("/:gametitle", async (req, res) => {
  const gametitle = req.params.gametitle;
  console.log(gametitle);
  console.log("WE ARE HERE ATM");
  //const game = await Games.findAll({ where: { gametitle: gametitle } });
  const gamedel = await Games.destroy({ where: { gametitle: gametitle } });
  const scoredel = await GameScores.destroy({
    where: { gametitle: gametitle },
  });
  return res.json(gamedel);
});

module.exports = router;
