async function token(req, res, next) {
  const {
    headers: { authorization = "" },
  } = req;

  console.log("token");
  try {
    if (authorization) {
      // Bearer eyJhbGciOiJIUzI1..생략
      const [, token] = authorization.split(" ");

      console.log("token", token);

      const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      const user = await prismaClient.user.findUnique({
        where: {
          id: verified.id,
        },
      });
      req.user = user;
      next();
    } else {
      next();
    }
  } catch (e) {
    // next(e);
  }
}

module.exports = token;
