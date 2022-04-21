
const WithdrawRequest = require('models/WithDrawRequest');
const BankDetail = require('models/BankDetail');
const User = require ('models/User');
import { filterWithDraw } from "utils/consts";
import { get, isEmpty } from "lodash";
const handler = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(201).json({
        error: true,
        message: "Please Login!",
        data: [],
      });
    }
    if (req.method === "GET") {
      const { search } = req.query;

      const allRequest = await WithdrawRequest.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "username", "totalTipsAmount"],
            where: filterWithDraw(search),
          },
        ],
        group: ["WithDrawRequest.id", "User.id"],
        order: [["createdAt", "DESC"]],
      });

      if (!isEmpty(allRequest)) {
        return res.status(200).json({
          error: false,
          message: "data fetched",
          data: allRequest,
        });
      } else {
        return res.status(204).json({
          error: false,
          message: "No data found",
          data: [],
        });
      }
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send("API failed", error.message);
  }
};
module.exports=handler