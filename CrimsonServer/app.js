// 상단은 디펜던시 임포트
// 경로에 대한 명시 없이 패키지명만 있을 경우 node_modules에 설치된 패키지를 가져오는 것입니다.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

// 경로에 대한 명시가 있다면 우리가 직접 생성한 파일을 불러오는 것입니다.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const clubsRouter = require('./routes/clubs');
const profileRouter = require('./routes/profile');
const articlesRouter = require('./routes/articles');
const articleRouter = require('./routes/article');
const commentRouter = require('./routes/comment');
const commentsRouter = require('./routes/comments');
const token = require('./middlewares/token');

// 익스프레스를 초기화 하는 단계입니다.
// https://expressjs.com/en/starter/hello-world.html
const app = express();

// view engine setup
// express cli 가 만들어준 기본 예제에서는 html을 내려주는 예제가 존재한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 여기는 express의 middleware를 연결하는 구간
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(token);
app.use(fileUpload());

// 우리가 직접 생성한 라우터를 연결하는 구간
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/clubs', clubsRouter);
app.use('/profile', profileRouter);
app.use('/articles', articlesRouter);
app.use('/article', articleRouter);
app.use('/comment', commentRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({
    status: err.status || 400,
    errorMsg: err.message,
  });
});

module.exports = app;
