// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 用户注册
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: '用户已存在' });
    }
    user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('服务器错误');
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '无效的用户信息' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '无效的用户信息' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('服务器错误');
  }
});

module.exports = router;
