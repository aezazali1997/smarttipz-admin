const User = require('models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Joi = require('joi');

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        const { headers: { authorization }, query: { id } } = req;
        try {
            

            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            await User.update({ isDeleted: true }, { where: { id } });

            res.status(200).json({ error: false, data: [], message: 'User deleted successfuly.' });
        } catch (err) {
            res.status(422).json({ error: true, message: err.message, data: [] });
        }
    }

    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
