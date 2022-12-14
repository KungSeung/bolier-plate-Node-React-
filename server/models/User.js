// 스키마는, 해당 컬렉션의
// 문서에 어떤 종류의 값이 들어가는지를 정의합니다.

// 모델은 스키마를 통해서 만드는 인스턴스입니다.

// require은 외부 모듈을 가져올 수 있다..
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { application } = require('express');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // space 없애주는 역할
    unique: 1, // 이메일은 무조건 한개
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// pre : usermodel을 저장하기 전에 무엇(function)을 한다
// 무엇 : 비밀번호를 암호화 시킨다
userSchema.pre('save', function (next) {
  // this는 위에 있는 userSchema를 카리킴
  var user = this;

  // 비밀번호가 바뀌었을때만 비밀번호를 암호화돼야 한다
  if (user.isModified('password')) {
    // next() -> index.js의 user.save(err, userInfo)로 들어감
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // 평범한 암호를 hash로 교체
        next();
      });
    });
  } else {
    next();
  }
});

// comparePassoword라는 메서드 -> index.js에서 사용
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 1. plainPassword = 1234567를 암호화
  // 2. this.password = 암호화된 비번 #!@152#~과 비교
  // 3. 암호화된 비번을 복호화 할 수 없다
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken을 이용해서 token 생성하기
  // user._id + 'secretToken' = token, secretToken을 넣어서 토큰생성
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user); // 에러가 없으면 null과 user정보 반환
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을 decode(복호화) 한다.
  jwt.verify(token, 'secretToken', function (err, decoded) {
    // 1. 유저 아이디를 이용해서 유저를 찾은 다음에
    // 2. 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// model이 schema를 감싼다 -> (model명, schema명)
const User = mongoose.model('User', userSchema);

// model을 다른곳에서도 쓸 수 있게 해준다
module.exports = { User };
