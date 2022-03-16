const PermissionType = require('models/PermissionType');

const Session = require('../../models/Session');
const Testimonial = require('../../models/Testimonial');
const BusinessCard = require('../../models/BusinessCard');
const Chat = require('../../models/Chat');
const Admin = require('models/Admin');
const User = require('../../models/User');
const Business = require('../../models/Business');
const Video = require('../../models/Video');
const VideoCategory = require('../../models/VideoCategory');
const Views = require('../../models/Views')
const BankDetail = require('models/BankDetail');
const WithDrawRequest = require('models/WithDrawRequest');
const Pay = require('models/Pay');
const TipTransaction = require('models/TipTransaction');
const AllPost = require('models/AllPost');
// const sequelize = require('sequelize');

const handler = async (req, res) => {
    // Admin.sync({
    //     alter:true
    // })
    // TipTransaction.sync({
    //     alter:true
    // });
    // Pay.sync({
    //     alter:true
    // });
    WithDrawRequest.sync({
        alter:true
    })

        User.sync({
            alter:true
        });
        BankDetail.sync({
            alter:true
        })
        // WithDrawRequest.sync({
        //     alter:true
        // })
        // Admin.sync({
        //     alter:true
        // })
    // sequelize.sync({ alter: true });
    // Admin.sync({ alter: true });
    // PermissionType.sync({ alter: true });
        // Views.sync({alter:true})
    // Session.sync({ force: true });
    // Business.sync({ force: true });
    // BusinessCard.sync({ force: true });
    // Chat.sync({ force: true });
    // Testimonial.sync({ force: true });
    // User.sync({ alter: true });
    // Video.sync({ alter: true });
    // VideoCategory.sync({ force: true });
    // AllPost.sync({
    //     alter:true
    // })

    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;