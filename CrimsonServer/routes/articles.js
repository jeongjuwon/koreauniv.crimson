const express = require("express");
const prismaClient = require("../libs/prisma");
const router = express.Router();

/* GET users listing. */
router.get("/:clubId", async function (req, res, next) {
  const { clubId } = req.params;

  try {
    const articles = await prismaClient.article.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        profile: {
          select: {
            name: true,
          },
        },
      },
      where: {
        clubId: parseInt(clubId, 10),
      },
    });

    res.json(articles);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
