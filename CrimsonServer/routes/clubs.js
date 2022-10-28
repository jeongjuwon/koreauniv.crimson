const express = require("express");
const router = express.Router();
const prismaClient = require("../libs/prisma");

// GET /clubs
router.get("/", async function (req, res, next) {
  const clubs = await prismaClient.club.findMany({});
  res.json(clubs);
});

module.exports = router;
