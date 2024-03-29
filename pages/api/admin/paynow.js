const WithDrawRequest = require("models/WithDrawRequest");
const Admin = require("models/Admin");
const User = require("models/User");
const BankDetail = require("models/BankDetail");
const SendEmail = require("utils/sendMail");
const stripe = require("stripe")(process.env.STRIPE_SK);
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

      for (let i = 0; i < data.length; i++) {
        let ammount = 0;
        let withDrawReq = await WithDrawRequest.findOne({
          where: {
            id: data[i].id,
          },
        });
        ammount = Number(data[i].payment);

        let user = await User.findOne({
          where: {
            id: withDrawReq.UserId,
          },
        });

        const transfer = await stripe.transfers.create({
          amount: Number((ammount * 100).toString().split(".")[0]),
          currency: "usd",
          destination: user.stripeAccountId,
        });

        const requests = await WithDrawRequest.update(
          {
            status: true,
          },
          {
            where: {
              id: data[i].id,
            },
          }
        );

        const { success, message } = await SendEmail(
          user.email,
          "SmartTipz Payment alert!",
          `The SmartTipz has sent you the amount: $ ${ammount} against your withdrawal request .The amount will appear in your stripe account within 5 working days`,
          "d-ac5c77a4fb3242d2830134ac2342f1dc"
        );
        // it needs to be changed
        if (!success)
          return res
            .status(400)
            .json({ error: true, message: message, data: [] });
      }
      const admin = await Admin.findOne({
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
        order: [["createdAt", "DESC"]],
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
