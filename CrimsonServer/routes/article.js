const express = require('express');
const {route} = require('.');
const router = express.Router();
const prismaClient = require('../libs/prisma');

/* GET users listing. */
router.post('/', async function (req, res, next) {
  const {clubId: orgClubId, articleId, title, content} = req.body;
  const {user} = req;

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

    let article;

    if (articleId) {
      article = await prismaClient.article.update({
        data: {
          title,
          content,
        },
        where: {
          id: articleId,
        },
      });
    } else {
      article = await prismaClient.article.create({
        data: {
          clubId,
          profileId: profile.id,
          title,
          content,
        },
      });
    }

    res.json(article);
  } catch (e) {
    next(e);
  }
});

router.get('/:articleId', async function (req, res, next) {
  const {articleId} = req.params;

  try {
    const article = await prismaClient.article.findUnique({
      select: {
        profile: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        id: parseInt(articleId, 10),
      },
    });

    if (!article) {
      next(new Error('게시물이 없습니다.'));
      return;
    }

    res.json(article);
  } catch (e) {
    next(e);
  }
});

router.delete('/:articleId', async function (req, res, next) {
  const {articleId} = req.params;

  try {
    const article = await prismaClient.article.delete({
      where: {
        id: parseInt(articleId, 10),
      },
    });
    res.json(article);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
