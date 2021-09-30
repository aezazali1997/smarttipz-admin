const Admin = require('../../../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Joi = require('joi');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { body, body: { name, email, password, role } } = req;
        const validateSignup = (data) => {
            const schema = Joi.object({
                name: Joi.string().required(),
                // username: Joi.string().required(),
                role: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().required(),
            });
            return schema.validate(data);
        };

        const { error } = validateSignup(body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        let user;

        try {
            // user = await Admin.findOne({ where: { username } });
            // if (user) {
            //     throw new Error('Username already exists');
            // }

            user = await Admin.findOne({ where: { email } });
            if (user) {
                throw new Error('Email already in use');
            }

            console.log(user)

            const encPassword = await bcrypt.hash(password, 12);



            await Admin.create({
                name,
                // username,
                role,
                email,
                password: encPassword,
            });



            res.status(201).json({ error: false, data: {}, message: 'User successfuly signed up.' });
        } catch (err) {
            res.status(422).json({ error: true, message: err.message, data: [] });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
