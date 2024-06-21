// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// 中间件
app.use(bodyParser.json());
app.use(cors());

// 连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/memo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
db.once('open', () => {
  console.log('MongoDB 数据库连接成功');
});

// 路由
app.use('/api/auth', require('./routes/auth'));

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
