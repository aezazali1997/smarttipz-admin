import { isEmpty } from "lodash";

const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const Admin = require ('models/Admin');
const handler = async(req, res) => {
  if (req.method === "GET") {
    const {
      query: { adminId },
    } = req;

    try {
      const admin = await Admin.findOne({
        where:{
          id:adminId
        }
      });
      console.log('admin',admin.totalAmount);
    res.status(200).send({
      error:false,
      message:'Balance fetched Succesfully',
      data:admin.totalAmount
    });
    } catch (error) {
      console.log('ERROR! ',error.message);
      res.status(400).send({
        error: true, data: [], message: error.message
      })
    }

  }
};
export default handler;
