const express = require('express');
const router = express.Router();
const prismaClient = require('../libs/prisma');
const jwt = require('jsonwebtoken');

// GET /profile
router.get('/', async function (req, res, next) {
  const {clubId} = req.query;
  const {user} = req;
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
router.post('/', async function (req, res, next) {
  console.log('req.body', req.body);
  const {clubId, nickName: name, profileId} = req.body;
  const {id: userId} = req.user;

  try {
    let profile;
    if (profileId) {
      profile = await prismaClient.profile.update({
        data: {
          name,
        },
        where: {
          id: parseInt(profileId, 10),
        },
      });
    } else {
      profile = await prismaClient.profile.create({
        data: {
          name,
          userId,
          clubId,
        },
      });
    }

    res.json(profile);
  } catch (e) {
    next(e);
  }
});

router.post('/upload', async function (req, res, next) {
  // console.log('req.files', req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new Error('업로드된 파일이 없습니다.'));
  }

  const {photo} = req.files;
  const {profileId} = req.body;
  // 23sdfnklfs-ksdfjljk324-kldsfjsl32-lsdjf23.jpg
  // ['23sdfnklfs-ksdfjljk324-kldsfjsl32-lsdjf23', 'jpg'].pop();
  // jpg, png 등의 파일 확장자 명
  const extName = photo.name.split('.').pop();
  const fileName = `${profileId}.${extName}`; // 1.jpg
  const uploadPath = `${__dirname}/../public/data/${fileName}`;

  await prismaClient.profile.update({
    data: {
      image: fileName,
    },
    where: {
      id: parseInt(profileId, 10),
    },
  });
  photo.mv(uploadPath, function (err) {
    if (err) {
      return next(err);
    }

    res.json({
      sucess: true,
      image: fileName,
    });
  });
});

router.delete('/', async function (req, res, next) {
  const {profileId} = req.body;
  try {
    const profile = await prismaClient.profile.delete({
      where: {
        id: parseInt(profileId, 10),
      },
    });
    res.json(profile);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
