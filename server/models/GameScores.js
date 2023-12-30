module.exports = (sequelize, DataTypes) => {
  const GameScores = sequelize.define("GameScores", {
    scores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return GameScores;
};
