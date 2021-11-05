
const jwt = require('jsonwebtoken');

const User = require('models/User');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { headers, body: { id, isBlocked } } = req;

        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            await User.update({ isBlocked: !isBlocked }, { where: { id } });

            res.status(200).send({ error: false, data: {}, message: `User ${isBlocked ? 'Unblocked' : 'Blocked'} successfully` });

        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    } else {
        res.status(404).end('API Not Found');
    }
};

export default handler;
