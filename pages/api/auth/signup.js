const PermissionType = require('models/PermissionType');

const Admin = require('models/Admin');
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
        console.log(error)

        if (error) return res.status(400).json({ error: error.details[0].message });


        try {
            let user = await Admin.findOne({ where: { name } });
            if (user) {
                throw new Error('Username already exists');
            }

            user = await Admin.findOne({
                where: { email }
            });
            if (user) {
                return res.status(400).send({ error: true, data: {}, message: 'Email already in use' });
            }

            const encPassword = await bcrypt.hash(password, 12);
            try {
                const newUser = await Admin.create({
                    name,
                    // username,
                    role,
                    permissions: [{
                        name: 'admin',
                        value: true
    
                    },
                    {
                        name: 'manageUsers',
                        value: true
    
                    },
                    {
                        name: 'businessVerification',
                        value: true
    
                    },
                    {
                        name: 'contentManagement',
                        value: true
    
                    }],
                    email,
                    password: encPassword,
                });
    
        
                } catch (error) {
                        console.log('ERROR ',error)
            }
                        // const { id } = newUser;

            // const permissions = await PermissionType.create({
            //     names: ['admin', 'businessVerification', 'manageUsers', 'contentMangement'],
            //     AdminId: id
            // });

            // await newUser.setPermissions(permissions);

            res.status(201).json({ error: false, data: {}, message: 'User successfuly signed up.' });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
