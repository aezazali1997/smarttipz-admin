import SendEmail from "utils/sendMail";

const jwt = require("jsonwebtoken");

const User = require("models/User");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      headers,
      body: { id, isBlocked },
    } = req;

    try {
      if (!headers.authorization) {
        return res
          .status(401)
          .send({ error: true, data: [], message: "Please Login" });
      }

      const result = jwt.verify(
        headers.authorization.split(" ")[1],
        process.env.SECRET_KEY
      );

      const user = await User.findById(id);

      await User.update({ isBlocked: !isBlocked }, { where: { id } });
      console.log("user ", user.email, isBlocked);
      if (isBlocked) {
        const { success, message } = await SendEmail(
          user.email,
          "SmartTipz Profile Unblocked!",
          `The SmartTipz has unblocked your account as a business profile`,
          "d-c6ae3046cfda41ae9ade77a8256fb32f"
        );
        // it needs to be changed
        if (!success)
          return res
            .status(400)
            .json({ error: true, message: message, data: [] });
      } else {
        const { success, message } = await SendEmail(
          user.email,
          "SmartTipz Profile Blocked!",
          `The SmartTipz has blocked your account as a business profile`,
          "d-8a073035fdef404888449394fb0ea15d"
        );
        // it needs to be changed
        if (!success)
          return res
            .status(400)
            .json({ error: true, message: message, data: [] });
      }

      res.status(200).send({
        error: false,
        data: {},
        message: `User ${isBlocked ? "Unblocked" : "Blocked"} successfully`,
      });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end("API Not Found");
  }
};

export default handler;
