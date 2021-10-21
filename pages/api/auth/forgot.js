const Admin = require('../../../models/Admin');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const randomString = require('../../../utils/random');
const sendEmail = require('../../../utils/sendMail');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const validateForgot = (data) => {
      const schema = Joi.object({
        email: Joi.string().required().email()
      });
      return schema.validate(data);
    };

    const { error } = validateForgot(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const email = req.body.email;
    try {
      const user = await Admin.findOne({ where: { email } });

      if (!user) {
        throw new Error('User does not exist.');
      }

      const newPassword = randomString(12);

      const encNewPassword = await bcrypt.hash(newPassword, 12);

      await user.update({ password: encNewPassword });
      console.log(newPassword);

      await sendEmail(email, 'New Password', `Your new password is: ${newPassword}`, 'd-70a276f41c8344cf92e0fe253f774c03');

      res.status(201).json({ error: false, message: 'New password sent', data: [] });
    } catch (err) {
      res.status(400).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
