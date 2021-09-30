const jwt = require('jsonwebtoken');

const Admin = require('../../../../models/Admin');

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

            await Admin.update({ isApproved: true }, { where: { id } });

            res.status(200).send({ error: false, data: {}, message: 'Admin verified successfully' });

        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    } else {
        res.status(404).end('API Not Found');
    }
};

export default handler;
