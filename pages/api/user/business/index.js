import { getUsers } from 'utils/consts';

const jwt = require('jsonwebtoken');

const Business = require('models/Business');
const User = require('models/User');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { headers, query: { search } } = req;

        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const users = await User.findAll({
                include: [
                    {
                        model: Business,
                        attribute: ['link']
                    }
                ],
                where: getUsers(search),
                order: [["createdAt", "DESC"]]
            });
            console.log(users);
            if (!users) {
                return res.status(404).send({ error: true, message: 'No users yet', data: [] });
            }

            res.status(200).send({ error: false, data: { users }, message: 'Data fetched successfully' });

        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    }
    else if (req.method === 'PUT') {
        const { body, body: { name, email, password, id, phoneNumber, website }, headers: { authorization } } = req;
        const validateSignup = (data) => {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                website: Joi.string().uri().required()
                // username: Joi.string().required(),
                // password: Joi.string().optional().allow('').allow(null),
                // id: Joi.string().optional().allow('').allow(null),
            });
            return schema.validate(data);
        };

        const data = {
            name, email, website
        }
        const { error } = validateSignup(data);

        if (error) return res.status(400).json({ error: error.details[0].message });

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );
            if (!password) {
                await User.update({ name, email, phoneNumber }, { where: { id } });
            }
            else {
                const encPassword = await bcrypt.hash(password, 12);
                await User.update({ name, email, password: encPassword, phoneNumber }, { where: { id } });
            }

            await Business.update({ link: website }, { where: { UserId: id } })

            res.status(201).json({ error: false, data: {}, message: 'User updated successfuly.' });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    }
    else {
        res.status(404).end('API Not Found');
    }
};

export default handler;
