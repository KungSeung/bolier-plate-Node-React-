// back-end 서버의 시작점
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

// application/x-www-from-urlencoded <- 이런 타입을 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
// application/json <- 이런 타입을 분석해서 가져옴
app.use(bodyParser.json());

// mongoose를 이용해서 app과 mongoDB를 연결
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 ddd');
});

// post : request 타입, end : /register (종착)
// postman에서 대신 기입 (우리는 데이터를 쏴줄 수 있는 form이 없기때문)
app.post('/register', (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
