const Session = require('../../models/Session');
const Testimonial = require('../../models/Testimonial');
const BusinessCard = require('../../models/BusinessCard');
const Chat = require('../../models/Chat');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
const Business = require('../../models/Business');
const Video = require('../../models/Video');
const VideoCategory = require('../../models/VideoCategory');
// const sequelize = require('sequelize');

const handler = async (req, res) => {

    // sequelize.sync({ alter: true });
    Admin.sync({ force: true });
    Session.sync({ force: true });
    Business.sync({ force: true });
    BusinessCard.sync({ force: true });
    Chat.sync({ force: true });
    Testimonial.sync({ force: true });
    User.sync({ force: true });
    Video.sync({ force: true });
    VideoCategory.sync({ force: true });

    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;