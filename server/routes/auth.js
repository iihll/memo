// routes/auth.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Note = require('../models/Note')

// 用户注册
router.post('/register', async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: '用户已存在' })
    }
    user = new User({ email, password })
    await user.save()
    res.status(201).json({ message: '用户注册成功' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('服务器错误')
  }
})

// 用户登录
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: '无效的用户信息' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: '无效的用户信息' })
    }
    const payload = {
      user: {
        id: user.id,
      },
    }
    jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('服务器错误')
  }
})

// 返回用户信息
router.get('/userinfo', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('服务器错误')
  }
})

router.post('/sync-data', authMiddleware, async (req, res) => {
  const clientData = Array.isArray(req.body) ? req.body : []; // 假设客户端发送JSON数组

  try {
    // 处理clientData，更新或插入到MongoDB
    for (const item of clientData) {
      // 将req.user.id与item关联，并且确保不覆盖item中的id字段
      const query = { key: item.key, userId: req.user.id };
      const update = { ...item, userId: req.user.id };
      await Note.findOneAndUpdate(query, update, { upsert: true });
    }

    // 从MongoDB中检索更新后的数据
    const updatedData = await Note.find({ userId: req.user.id });

    // 只在返回给客户端时组装成数组
    const assembledData = updatedData.map(item => item.toObject());

    res.json(assembledData);
  } catch (error) {
    console.error('同步数据错误:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

function authMiddleware(req, res, next) {
  // 从请求头中获取token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // 检查token是否存在
  if (!token) {
    return res.status(401).json({ message: '没有授权，拒绝访问' })
  }

  try {
    // 验证token
    const decoded = jwt.verify(token, 'jwtSecret')

    // 将解码后的用户信息存储在请求对象中的user属性中
    req.user = decoded.user
    next()
  } catch (error) {
    console.error(error.message)
    res.status(401).json({ message: 'Token无效' })
  }
}

module.exports = router
