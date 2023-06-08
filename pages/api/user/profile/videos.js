import { isEmpty } from "lodash";
import AllPosts from "models/AllPost";
import Comments from "models/Comments";
import PostLikee from "models/Like";
import Share from "models/Share";
import db from "models/db";
const User = require("models/User");
const Video = require("models/Video");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

const handler = async (req, res) => {
  if (req.method === "GET") {
    const {
      query: { username },
    } = req;
    try {
      if (!req.headers.authorization) {
        return res
          .status(401)
          .send({ error: true, data: [], message: "Please Login" });
      }
      const response = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.SECRET_KEY
      );

      const user = await User.findOne({
        attributes: ["id"],
        where: { username },
      });

      if (!user) {
        return res
          .status(404)
          .send({ error: true, data: [], message: "User Not Found" });
      }
      const { id: userId } = user;

      const videos = await AllPosts.findAll({
        include: [
          {
            model: Video,
            include: [
              {
                model: User,
                attributes: ["name", "username", "picture"],
              },
            ],
          },
          {
            model: Share,
            attributes: ["id"],
          },
        ],
        where: {
          [sequelize.Op.and]: [
            {
              "$Video.isApproved$": {
                [sequelize.Op.eq]: true,
              },
            },
            {
              "$Video.UserId$": {
                [sequelize.Op.eq]: userId,
              },
            },
            {
              "$Video.category$": {
                [sequelize.Op.not]: "catalogue",
              },
            },
            {
              isShared: {
                [sequelize.Op.eq]: false,
              },
            },
          ],
        },
        group: [
          "AllPost.id",
          "Video.id",
          "Share.id",
          "Video->User.id",
          "Video->User.name",
          "Video->User.username",
          "Video->User.picture",
        ],
        order: [["createdAt", "DESC"]],
      });

      for (let i = 0; i < videos.length; i++) {
        const item = videos[i];
        console.log('item -------------',item)
        const { id, VideoId, Video,likeCount,commentCount} = item;

        const shareCount = await Share.count({
          where: {
            VideoId,
          },
        });
        const ratings =
          await db.query(`select avg(r."rating") as "avgRating", count(r."AllPostId") as "totalRaters" from "AllPosts" p
						left join "Ratings" as r on p.id=r."AllPostId"
						where (p.id=${id} and r."AllPostId"=${id})
						group by p.id`);

        const avgRating = isEmpty(ratings[0]) ? 0 : ratings[0][0].avgRating;
       

        videos[i] = {
          id,
          avgRating,
          VideoId,
          Video,
          likeCount,
          shareCount:Video.shareCount,
          commentCount,
        };
      }

      res.status(200).json({
        message: "success",
        data: { videos },
      });
    } catch (err) {
      console.log("Videos Api Failed Error: ", err.message);
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else {
    res.status(404).end("Page Not Found");
  }
};

export default handler;
