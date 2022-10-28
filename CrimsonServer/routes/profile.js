const express = require("express");
const router = express.Router();
const prismaClient = require("../libs/prisma");
const jwt = require("jsonwebtoken");

// GET /profile
router.get("/", async function (req, res, next) {
  const { clubId } = req.body;
  const { user } = req;
  console.log(user);
  // req.header에서 토큰을 받아다가 유저의 아이디를 알아내야한다.
  // 어떤 유저? 이 API를 호출하는(이 REST URL 자원을 호출하는) 유저의 아이디를 알아내야죠..
  // 호출하는 쪽(앱 사용자)에서도 header에 token을 넘겨야한다.

  const profile = await prismaClient.profile.findUnique({
    where: {
      clubId_userId_unique_key: {
        clubId,
        userId: user.id,
      },
    },
  });

  // profile 정보가 없을 경우 null 임
  res.json(profile);
});

module.exports = router;
