
const jwt = require('jsonwebtoken');

const User = require('models/User');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const handler = async (req, res) => {
    if (req.method === 'POST') {
     
      const {
        headers,
        body: { id },
      } = req;

      try {
        if (!headers.authorization) {
          return res
            .status(401)
            .send({ error: true, data: [], message: "Please Login" });
        }

        const result = jwt.verify(
          headers.authorization.split(" ")[1],
          process.env.SECRET_KEY
        );

        await User.update({ isApproved: true }, { where: { id } });

        const { email } = await User.findOne({
          attributes: ["email"],
          where: { id },
        });

        //
        const { success, message } = await SendEmail(
          "aezazali.pro@gmail.com",
          "SmartTipz Profile Verified!",
          `The SmartTipz has verified your account as a business profile`,
          "d-d46b8176a5a744bca3fff23e93be6889"
        );
        // it needs to be changed
        if (!success)
          return res
            .status(400)
            .json({ error: true, message: message, data: [] });

        res.status(200).send({
          error: false,
          data: {},
          message: "User verified successfully",
        });
      } catch (err) {
        res.status(500).json({ error: true, message: err.message, data: [] });
      }
    } else {
        res.status(404).end('API Not Found');
    }
};

export default handler;
