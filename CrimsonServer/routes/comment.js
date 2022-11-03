const express = require('express');
const prismaClient = require('../libs/prisma');
const router = express.Router();

/* POST comment */
router.post('/', async function (req, res, next) {
  const {content, clubId, articleId, authorId, commentId} = req.body;
  try {
    let comment;
    if (commentId) {
      comment = await prismaClient.comment.update({
        data: {
          content,
        },
        where: {
          id: parseInt(commentId, 10),
        },
      });
    } else {
      comment = await prismaClient.comment.create({
        data: {
          content,
          clubId,
          articleId,
          authorId,
          createdAt: new Date(),
        },
      });
    }

    res.json(comment);
  } catch (e) {
    next(e);
  }
});

router.delete('/:commentId', async function (req, res, next) {
  const {commentId} = req.params;

  try {
    const comment = await prismaClient.comment.delete({
      where: {
        id: parseInt(commentId, 10),
      },
    });
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
