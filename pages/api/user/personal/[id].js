import SendEmail from "utils/sendMail";

const User = require("models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      const user = await User.findById(id);
      await User.update({ isDeleted: true }, { where: { id } });

      const { success, message } = await SendEmail(
        user.email,
        "SmartTipz Profile Deleted!",
        `The SmartTipz has deleted your profile`,
        "d-c34520465f7a4e0fa6f19c3e5490969c"
      );
      // it needs to be changed
      if (!success)
        return res
          .status(400)
          .json({ error: true, message: message, data: [] });

      res
        .status(200)
        .json({ error: false, data: [], message: "User deleted successfuly." });
    } catch (err) {
      res.status(422).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end("Page Not Found");
  }
};

export default handler;
