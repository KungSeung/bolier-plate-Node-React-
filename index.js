// back-end 서버의 시작점
const express = require('express');
const app = express();
const port = 3000;

// mongoose를 이용해서 app과 mongoDB를 연결
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://Seung:n71108527@bolierplate.nxcvhix.mongodb.net/?retryWrites=true&w=majority',
    {}
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
