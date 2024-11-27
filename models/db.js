const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(

  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    port:process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will help you connect securely by enforcing SSL
        rejectUnauthorized: false // This should only be used if you fully trust your database and it uses a self-signed certificate
      }
    }
  }
);

module.exports = sequelize;
