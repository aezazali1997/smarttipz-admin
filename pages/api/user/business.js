const jwt = require('jsonwebtoken');

const User = require('../../../models/User');

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { headers } = req;

        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const users = await User.findAll({ where: { accountType: 'Business' } });
            console.log(users);
            if (!users) {
                return res.status(404).send({ error: true, message: 'No users yet', data: [] });
            }

            res.status(200).send({ error: false, data: { users }, message: 'Data fetched successfully' });

        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    } else {
        res.status(404).end('API Not Found');
    }
};

export default handler;
