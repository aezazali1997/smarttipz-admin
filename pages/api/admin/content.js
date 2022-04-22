import {
  FilterContent,
  getPagination,
  getPagingData,
  filterVideoContent,
  containsSearchedView,
} from "utils/consts";

const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const Video = require("../../../models/Video");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
  if (req.method === "GET") {
    const {
      headers: { authorization },
      query: { search, page },
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

      // const { limit, offset } = getPagination(page, 10);

      const videos = await Video.findAll({
        include: [
          {
            model: User,
            where: FilterContent(search),
          },
        ],
        // limit: limit,
        // offset: offset,
        where: filterVideoContent(search),
        order: [["createdAt", "DESC"]],
      });

      // const response = getPagingData(videos, page, limit);

      res.status(200).json({
        error: false,
        data: { videos },
        message: "Content fetched successfuly.",
      });
    } catch (err) {
      res.status(500).json({ error: true, message: err, data: [] });
    }
  } else if (req.method === "POST") {
    const {
      body,
      body: { email, message, id, UserId },
      headers: { authorization },
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

      const video = await Video.update(
        { isApproved: false },
        {
          where: { id },
        }
      );

      const msg = {
        to: `${email}`, // Change to your recipient
        from: {
          email: process.env.SENDER_EMAIL, // Change to your verified sender
          name: "Smart Tipz",
        }, // Change to your verified sender
        subject: "Video Removal Alert!",
        templateId: "d-a26d4bad11674eb5b720cd86cc6c189b",
        dynamicTemplateData: {
          message: message,
        },
      };

      console.log("msg => ", msg);
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
          return res.send({
            error: false,
            data: {},
            message: "Message sent successfully",
          });
        })
        .catch((error) => {
          console.error(error);
          return res
            .status(400)
            .send({ error: true, message: "Message not Sent, try again." });
        });

      res.status(200).json({
        error: false,
        data: {},
        message: "Content removed successfuly.",
      });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end("Page Not Found");
  }
};

export default handler;
