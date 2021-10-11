import { useEffect } from 'react';

const User = require('models/User');

const Video = require('models/Video');
// const Admin = require('models/Admin');

const { isEmpty } = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const sequelize = require('sequelize');


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { headers: { authorization } } = req;
        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const users = await User.findAll({
                include: [
                    {
                        model: Video, where: { mediaType: 'video' }
                    }
                ],
                where: {
                    isDeleted: false,
                },
            });

            res.status(200).json({ error: false, data: { users }, message: 'Admins fetched successfuly.' });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    }
    if (req.method === 'POST') {
        const { body, body: { email, message }, headers: { authorization } } = req;

        console.log('email,message', email, message);

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const user = await User.findOne({
                where: {
                    email
                },
            });

            if (!user) {
                return res.status(404).json({ error: true, data: {}, message: 'No use found.' });
            }

            const msg = {
                to: `${email}`, // Change to your recipient
                from: {
                    email: process.env.SENDER_EMAIL, // Change to your verified sender
                    name: 'Smart Tipz'
                }, // Change to your verified sender
                subject: 'Video Alert',
                templateId: 'd-c85cb598abce4fcc8693605a007ca9e9',
                dynamicTemplateData: {
                    message: message,
                },
            }

            console.log("msg => ", msg);
            sgMail
                .send(msg)
                .then((response) => {
                    console.log(response[0].statusCode)
                    console.log(response[0].headers)
                    user.isApproved = false;
                    user.save();
                    return res.send({
                        error: false,
                        data: {},
                        message: 'Message sent successfully',
                    });
                })
                .catch((error) => {
                    console.error(error)
                    return res
                        .status(400)
                        .send({ error: true, message: 'Message not Sent, try again.' });
                }
                )



            res.status(200).json({ error: false, data: {}, message: 'Content removed successfuly.' });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    }


    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
