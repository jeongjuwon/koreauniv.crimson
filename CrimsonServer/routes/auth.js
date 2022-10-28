const express = require("express");
const router = express.Router();
const { encryptPassword, matchPassword } = require("../libs/encryptPassword");
const jwt = require("jsonwebtoken");

const prismaClient = require("../libs/prisma");

/* GET home page. */
router.post("/signUp", async function (req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email) {
      throw new Error("이메일이 없습니다.");
    }

    if (!password) {
      throw new Error("패스워드가 없습니다.");
    }

    const encryptedPassword = encryptPassword(password);

    const user = await prismaClient.user.create({
      data: {
        email,
        password: encryptedPassword,
        createdAt: new Date(),
      },
    });

    //   const user = {
    //     email: '이메일',
    //     password: '암호',
    //     createdAt: '2022-10-26T11:36:24.000Z',
    //   }
    res.json(user);
  } catch (e) {
    throw e;
  }
});

router.post("/signIn", async function (req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email) {
      next(new Error("이메일이 없습니다."));
    }

    if (!password) {
      next(new Error("패스워드가 없습니다."));
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      next(new Error("잘못된 계정 정보입니다."));
    }

    console.log("matchPassword", matchPassword(password, user.password));

    if (matchPassword(password, user.password) === false) {
      next(new Error("잘못된 계정 정보입니다."));
    }

    const token = jwt.sign(
      {
        email,
        id: user.id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    res.json({
      token,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
