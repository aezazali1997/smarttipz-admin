import PermissionType from 'models/PermissionType';
import SendEmail from "utils/sendMail";
const { getFilterAdmins } = require("utils/consts");

const { isEmpty, forEach } = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Admin = require("../../../models/Admin");

const handler = async (req, res) => {
  if (req.method === "GET") {
    const {
      headers: { authorization },
      query: { search },
    } = req;
    try {
      if (!authorization) {
        return res
          .status(401)
          .send({ error: true, data: [], message: "Please Login" });
      }

      const result = jwt.verify(
        authorization.split(" ")[1],
        process.env.SECRET_KEY
      );

      const admins = await Admin.findAll({
        where: getFilterAdmins(search),
        // where: {
        //     isDelete: false,
        //     // role: {
        //     //     [sequelize.Op.not]: 'superadmin'
        //     // }
        // },
        // // order: [["createdAt", "DESC"]]
        order: [["createdAt", "ASC"]],
      });

      if (isEmpty(admins)) {
        return res.status(200).json({
          error: false,
          data: { admins },
          message: "Admins fetched successfuly.",
        });
      }

      res.status(200).json({
        error: false,
        data: { admins },
        message: "Admins fetched successfuly.",
      });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  } else if (req.method === "POST") {
    console.log("post---------------------------");
    const {
      body,
      body: { name, email, password, permissions },
      headers: { authorization },
    } = req;
    const validateSignup = (data) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        // username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        permissions: Joi.optional().allow(null),
        role: Joi.string().optional().allow("").allow(null),
      });
      return schema.validate(data);
    };

    const { error } = validateSignup(body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      if (!authorization) {
        return res
          .status(401)
          .send({ error: true, data: [], message: "Please Login" });
      }

      const result = jwt.verify(
        authorization.split(" ")[1],
        process.env.SECRET_KEY
      );
      // user = await Admin.findOne({ where: { username } });
      // if (user) {
      //     throw new Error('Username already exists');
      // }

      const user = await Admin.findOne({ where: { email } });
      if (user) {
        throw new Error("Email already in use");
      }

      const encPassword = await bcrypt.hash(password, 12);

      await Admin.create({
        name,
        email,
        password: encPassword,
        // username,
        role: "admin",
        permissions,
      });

      const { success, message } = await SendEmail(
        email,
        "SmartTipz Admin created",
        `SmartTipz has added you as an Admin in their Admin Panel.\n Your credentials to login are\n Email: ${email} \n Password: ${password}`,
        "d-048b0fc854b649b3923fa6f1c45a31d6"
      );
      if (!success)
        return res
          .status(400)
          .json({ error: true, message: message, data: [] });

      res.status(201).json({
        error: false,
        data: {},
        message: "Admin created successfuly.",
      });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  } else if (req.method === "PUT") {
    const {
      body,
      body: { name, email, password, id },
      headers: { authorization },
    } = req;
    const validateSignup = (data) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        // username: Joi.string().required(),
        // password: Joi.string().optional().allow('').allow(null),
        // id: Joi.string().optional().allow('').allow(null),
      });
      return schema.validate(data);
    };

    const data = {
      name,
      email,
    };
    const { error } = validateSignup(data);

    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      if (!authorization) {
        return res
          .status(401)
          .send({ error: true, data: [], message: "Please Login" });
      }

      const result = jwt.verify(
        authorization.split(" ")[1],
        process.env.SECRET_KEY
      );
      if (!password) {
        await Admin.update({ name, email }, { where: { id } });
      } else {
        const encPassword = await bcrypt.hash(password, 12);
        await Admin.update(
          { name, email, password: encPassword },
          { where: { id } }
        );
      }

      res.status(201).json({
        error: false,
        data: {},
        message: "Admin updated successfuly.",
      });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end("Page Not Found");
  }
};

export default handler;
