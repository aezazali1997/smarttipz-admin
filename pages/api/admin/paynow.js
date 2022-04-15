const WithDrawRequest = require("models/WithDrawRequest");
const Admin = require("models/Admin");
const User = require("models/User");
const BankDetail = require("models/BankDetail");
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

      console.log("accounts", data);
      for (let i = 0; i < data.length; i++) {
        let ammount = 0;
        let withDrawReq = await WithDrawRequest.findOne({
          where: {
            id: data[i].id,
          },
        });
        ammount = Number(data[i].payment);
        console.log("amount : ", ammount);
        console.log(
          "amount con : ",
          (ammount.toFixed(10) * 100).toString().split(".")[0]
        );
        let user = await User.find({
          where: {
            id: withDrawReq.UserId,
          },
        });

        console.log("user", user.stripeAccountId);

        const transfer = await stripe.transfers.create({
          amount: Number((ammount * 100).toString().split(".")[0]),
          currency: "usd",
          destination: user.stripeAccountId,
        });

        console.log("transfer", transfer);

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
      }
      const admin = await Admin.find({
        where: {
          id: 4,
        },
      });
      console.log(typeof admin.totalAmount);
      console.log(typeof amount);

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
      console.log(admin.totalAmount);

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
