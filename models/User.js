// 스키마는, 해당 컬렉션의
// 문서에 어떤 종류의 값이 들어가는지를 정의합니다.

// 모델은 스키마를 통해서 만드는 인스턴스입니다.

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // space 없애주는 역할
    unique: 1,
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

// model이 schema를 감싼다 -> (model명, schema명)
const User = mongoose.model('User', userSchema);

// model을 다른곳에서도 쓸 수 있게 해준다
module.exports = { User };
