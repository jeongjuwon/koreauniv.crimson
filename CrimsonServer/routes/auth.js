const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { encryptPassword } = require("../libs/encryptPassword");

const prismaClient = new PrismaClient();

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

module.exports = router;
