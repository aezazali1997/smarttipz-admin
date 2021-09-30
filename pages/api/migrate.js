const BusinessCard = require('../../models/BusinessCard');
// import sequelize from '../../models/db';
const Admin = require('../../models/Admin');
const handler = async (req, res) => {

    Admin.sync({ alter: true });
    // Chat.sync({ force: true });
    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;