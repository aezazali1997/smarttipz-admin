const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Video = require('./Video');
const Business = require('./Business');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  varificationCode: {
    type: DataTypes.STRING
  },
  accountType: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  showPhone: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  showName: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  showUsername: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  picture: {
    type: DataTypes.STRING,
    defaultValue: 'https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
  },
  avgRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalRatingNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalViews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  numTips: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalTipsAmount: {
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  numVideos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  about: {
    type: DataTypes.TEXT
  },
  accessible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  tip: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  createdBy: {
    type: DataTypes.INTEGER
  },
  updatedBy: {
    type: DataTypes.INTEGER
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  approvedBy: {
    type: DataTypes.INTEGER
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

User.belongsToMany(User, {
  as: 'Follower',
  foreignKey: 'followingId',
  through: 'following'
});
User.belongsToMany(User, {
  as: 'Followed',
  foreignKey: 'followedId',
  through: 'following'
});

User.hasOne(Business);
Business.belongsTo(User);

User.hasMany(Video);
Video.belongsTo(User);

module.exports = User;
