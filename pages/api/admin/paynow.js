const WithDrawRequest = require("models/WithDrawRequest");
const Admin = require("models/Admin");
const User = require("models/User");
const BankDetail = require("models/BankDetail");
const handler = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        error: true,
        message: "Please Login!",
        data: [],
      });
    }
    if (req.method === "POST") {
      if (!req.body) {
        res.statsu(403).json({
          error: true,
          message: "No Body defined",
          data: [],
        });
      }
      const { amount, accounts } = req.body;

      let data = accounts;
      // change the status of ids in data array
      for (let i = 0; i < data.length; i++) {
        const requests = await WithDrawRequest.update(
          {
            status: true,
          },
          {
            where: {
              id: data[i],
            },
          }
        );
      }
      const admin = await Admin.find({
        where: {
          id: 4,
        },
      });
      await Admin.update(
        {
          totalAmount: Number(admin.totalAmount) - Number(amount),
        },
        {
          where: {
            id: 4,
          },
        }
      );

      const requests = await WithDrawRequest.findAll({
        include: [
          {
            model: BankDetail,
            attributes: ["iban", "accountTitle"],
          },
          {
            model: User,
            attributes: ["email", "totalTipsAmount"],
          },
        ],
        group: ["WithDrawRequest.id", "User.id", "BankDetail.id"],
      });

      res.status(200).json({
        error: false,
        data: {
          withDrawRequests: requests,
          balance: Number(admin.totalAmount) - Number(amount),
        },
        message: "Payment Sent",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      error: true,
      message: "API failed",
      data: [],
    });
  }
};
module.exports = handler;
