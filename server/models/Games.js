module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define("Games", {
    gametitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameinfo: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    tolink: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gameImage: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
      allowNull: false,
    },
    gamefile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Games;
};
