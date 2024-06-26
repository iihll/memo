const mongoose = require('mongoose');

 // 定义Note模型schema
 const noteSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note