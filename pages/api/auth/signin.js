const Admin = require('../../../models/Admin');

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');


const handler = async (req, res) => {
    if (req.method === 'POST') {

        const {
            body
        } = req;

        const validateSignin = (data) => {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            });
            return schema.validate(data);
        };
        console.log(body)
        const { error } = validateSignin(body);

        if (error)
            return res.status(400).json({ error: true, message: error.details[0].message, data: [] });

        const { email, password } = body;

        try {
            const user = await Admin.findOne({ where: { email } });
            if (!user) {
                return res.status(403).json({ error: true, message: 'Validation failed', data: [] });
            }

            const { id } = user;

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(403).json({ error: true, message: 'Validation failed', data: [] });
            }

            const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);

            res
                .status(200)
                .json({ error: false, message: 'Login successful', data: { id: id, username: user.username, token } });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    } else {
        res.status(404).end('API Not Found');
    }
};

export default handler;
