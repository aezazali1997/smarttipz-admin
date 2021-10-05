const Admin = require('../../../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Joi = require('joi');

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        const { headers: { authorization }, query: { id } } = req;
        try {
            console.log('adminID: ', id);

            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const admins = await Admin.update({ isDelete: true }, { where: { id } });

            console.log('admins: ', admins);

            res.status(200).json({ error: false, data: [], message: 'Admin delete successfuly.' });
        } catch (err) {
            res.status(422).json({ error: true, message: err.message, data: [] });
        }
    }
    else if (req.method === 'PUT') {
        const { body, body: { permissions }, headers: { authorization }, query: { id } } = req;
        const validateSignup = (data) => {
            const schema = Joi.object({
                permissions: Joi.required()
            });
            return schema.validate(data);
        };

        const { error } = validateSignup(body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            console.log('ADMIN ID, role: ', id, permissions)

            const admin = await Admin.update({ permissions }, { where: { id } });

            res.status(200).send({ error: false, data: [], message: 'Admin Access updated successfuly.' });

        }
        catch (err) {
            res.status(500).send({ error: true, message: err.message, data: [] });
        }
    }
    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
