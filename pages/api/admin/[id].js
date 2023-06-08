const Admin = require('../../../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import SendEmail from "utils/sendMail";
const { checkRoles } = require("utils/consts");

const Joi = require("joi");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const {
      headers: { authorization },
      query: { id },
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
      const admin = await Admin.findById(id);

      await Admin.update({ isDelete: true }, { where: { id } });

      const { success, message } = await SendEmail(
        admin.email,
        "SmartTipz Profile deleted!",
        `The SmartTipz has deleted you from the role of admin in their Admin Panel`,
        "d-7623b574a5ce48cda3e10cd76705c84b"
      );
      //
      if (!success)
        return res
          .status(400)
          .json({ error: true, message: message, data: [] });


      res
        .status(200)
        .json({ error: false, data: [], message: "Admin delete successfuly." });
    } catch (err) {
      res.status(422).json({ error: true, message: err.message, data: [] });
    }
  } else if (req.method === "PUT") {
    const {
      body,
      body: { permissions },
      headers: { authorization },
      query: { id },
    } = req;
    console.log('id recoeved',id);
    const validateSignup = (data) => {
      const schema = Joi.object({
        permissions: Joi.required(),
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

      const admin = await Admin.find({
        where:{
          id
        }
      });
      // check wether roles are removed or adeed
      const rolesUpdate = checkRoles(admin.permissions, permissions);
      const re = await Admin.update({ permissions }, { where: { id } });
      const { success, message } = await SendEmail(
        admin.email,
        "SmartTipz Permission Changed!",
        `${
          rolesUpdate.added
            ? `TThe SmartTipz has give you the role of ${rolesUpdate.rolesChanged.map(
                (role) => role.name
              )} in their Admin Panel`
            : `TThe SmartTipz has removed you from the role of ${rolesUpdate.rolesChanged.map(
                (role) => role.name
              )} in their Admin Panel `
        } `,
        "d-49a314c066a74e549021cf18bf2dddbf"
      );
      //
      if (!success)
        return res
          .status(400)
          .json({ error: true, message: message, data: [] });

      res.status(200).send({
        error: false,
        data: [],
        message: "Admin Access updated successfuly.",
      });
    } catch (err) {
      res.status(500).send({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end("Page Not Found");
  }
};

export default handler;
