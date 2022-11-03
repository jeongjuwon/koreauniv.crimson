const express = require('express');
const prismaClient = require('../libs/prisma');
const router = express.Router();

/* GET comments listing. */
router.get('/:articleId', async function (req, res, next) {
  const {articleId} = req.params;

  try {
    const comments = await prismaClient.comment.findMany({
      select: {
        id: true,
        authorId: true,
        clubId: true,
        content: true,
        createdAt: true,
        profile: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      where: {
        articleId: parseInt(articleId, 10),
      },
      orderBy: {
        id: 'desc',
      },
    });
    res.json(comments);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
