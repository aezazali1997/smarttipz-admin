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

const handler = async (req, res) => {
    Admin.sync({
        force:true
    })
    TipTransaction.sync({
        force:true
    });
    Pay.sync({
        force:true
    });
    WithDrawRequest.sync({
        force:true
    })

        User.sync({
            force:true
        });
        BankDetail.sync({
            force:true
        })
        WithDrawRequest.sync({
            force:true
        })
        Admin.sync({
            force:true
        })
        Admin.sync({ force: true });
        PermissionType.sync({ force: true });
        Views.sync({force:true})
        Session.sync({ force: true });
    Business.sync({ force: true });
    BusinessCard.sync({ force: true });
    Chat.sync({ force: true });
    Testimonial.sync({ force: true });
    User.sync({ force: true });
    Video.sync({ force: true });
    VideoCategory.sync({ force: true });
    AllPost.sync({
        force:true
    })
    
    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;