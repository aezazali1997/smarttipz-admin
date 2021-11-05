
const jwt = require('jsonwebtoken');

const User = require('models/User');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { headers, body: { id } } = req;

        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            await User.update({ isApproved: true }, { where: { id } });

            const { email } = await User.findOne({ attributes: ['email'], where: { id } });

            try {
                const msg = {
                    to: `${email}`, // Change to your recipient
                    from: {
                        email: process.env.SENDER_EMAIL, // Change to your verified sender
                        name: 'Smart Tipz'
                    },
                    subject: 'Account Verified',
                    templateId: 'd-39509ba02eca46119d9df77199cf3d75',
                }

                sgMail
                    .send(msg)
                    .then((response) => {
                        console.log(response[0].statusCode)
                        console.log(response[0].headers)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                console.log("invitation sent successfully");
            }
            catch (e) {
                console.log(e)
            }

            res.status(200).send({ error: false, data: {}, message: 'User verified successfully' });

        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    } else {
        res.status(404).end('API Not Found');
    }
};

export default handler;
