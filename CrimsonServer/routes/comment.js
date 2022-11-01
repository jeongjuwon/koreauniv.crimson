const express = require('express');
const prismaClient = require('../libs/prisma');
const router = express.Router();

/* POST comment */
router.post('/', async function (req, res, next) {
  const {content, clubId, articleId, authorId} = req.body;
  try {
    const comment = await prismaClient.comment.create({
      data: {
        content,
        clubId,
        articleId,
        authorId,
        createdAt: new Date(),
      },
    });

    res.json(comment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
