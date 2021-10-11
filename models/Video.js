const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Video = sequelize.define("Video", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  language: {
    type: DataTypes.STRING
  },
  isFree: {
    type: DataTypes.BOOLEAN,
  },
  agree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  mediaType: {
    type: DataTypes.STRING,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  tip: {
    type: DataTypes.INTEGER,
  },
  comment: {
    type: DataTypes.INTEGER,
  },
  approvedBy: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Video;
