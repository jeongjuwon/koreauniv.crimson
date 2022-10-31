const express = require("express");
const router = express.Router();
const prismaClient = require("../libs/prisma");

/* GET users listing. */
router.post("/", async function (req, res, next) {
  const { clubId: orgClubId, title, content } = req.body;
  const { user } = req;

  const clubId = parseInt(orgClubId, 10);

  try {
    const profile = await prismaClient.profile.findUnique({
      where: {
        clubId_userId_unique_key: {
          clubId,
          userId: user.id,
        },
      },
    });

    const article = await prismaClient.article.create({
      data: {
        clubId,
        profileId: profile.id,
        title,
        content,
      },
    });

    res.json(article);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
