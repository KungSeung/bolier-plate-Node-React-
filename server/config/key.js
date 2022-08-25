// process.env.NODE_ENV : 환경변수
// dev모드일 때는 환경변수가 development
// deploy(배포)모드일 때는 환경변수가 production

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
