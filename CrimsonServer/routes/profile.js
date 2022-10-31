const express = require("express");
const router = express.Router();
const prismaClient = require("../libs/prisma");
const jwt = require("jsonwebtoken");

// GET /profile
router.get("/", async function (req, res, next) {
  const { clubId } = req.query;
  const { user } = req;
  // console.log(req);
  // req.header에서 토큰을 받아다가 유저의 아이디를 알아내야한다.
  // 어떤 유저? 이 API를 호출하는(이 REST URL 자원을 호출하는) 유저의 아이디를 알아내야죠..
  // 호출하는 쪽(앱 사용자)에서도 header에 token을 넘겨야한다.

  try {
    const profile = await prismaClient.profile.findUnique({
      where: {
        clubId_userId_unique_key: {
          clubId: parseInt(clubId, 10),
          userId: user.id,
        },
      },
    });

    // profile 정보가 없을 경우 null 임
    if (!profile) {
      res.json({
        id: null,
      });
    } else {
      res.json(profile);
    }
  } catch (e) {
    next(e);
  }
});

// POST profile
router.post("/", async function (req, res, next) {
  console.log(req);
  const { clubId, nickName: name } = req.body;
  const { id: userId } = req.user;

  try {
    const profile = await prismaClient.profile.create({
      data: {
        name,
        userId,
        clubId,
      },
    });

    res.json(profile);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
