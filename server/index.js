// back-end 서버의 시작점
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// application/x-www-from-urlencoded <- 이런 타입을 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
// application/json <- 이런 타입을 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

// mongoose를 이용해서 app과 mongoDB를 연결
const mongoose = require('mongoose');
const { Router } = require('express');
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 ddd');
});

// post : request 타입, end : /register (종착)
// postman에서 대신 기입 (우리는 데이터를 쏴줄 수 있는 form이 없기때문)
app.post('/api/users/register', (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  // body-parser를 통해서 client의 정보를 req.body로 받아준다
  const user = new User(req.body);

  user.save((err, userInfo) => {
    console.log(userInfo);
    if (err) return res.json({ success: false, err });
    // status(200) : 성공했다
    return res.status(200).json({
      success: true,
    });
  });
});

// find -> compare -> genToken
// Code가 감싸져 있어야한다!!
app.post('/api/users/login', (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: 'false',
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }

    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });

      // 3. 비밀번호 까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 ...
        res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// role 1 어드민, role 2 특정 부서 어드민
// role 0 -> 일반유저, role 0이 아니면 관리자

app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말
  // 아래와 같이 할 수 있는 이유는 auth.js에서
  // req.token = token;
  // req.user = user; 했기 때문

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return err.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

// React에서 req보냄
app.get('/api/hello', (req, res) => {
  res.send('Hello world ~');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
