const { DataTypes } = require('sequelize');
const sequelize = require('./db');
// const User = require('./User');

const WithDrawRequest = require('./WithDrawRequest');

const BankDetail = sequelize.define('BankDetail',{
  accountTitle: { type: DataTypes.STRING },
  iban: {
    type: DataTypes.STRING
  }
});
BankDetail.hasOne(WithDrawRequest);
WithDrawRequest.belongsTo(BankDetail);
module.exports=BankDetail;
