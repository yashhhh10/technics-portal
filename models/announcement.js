const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  srNo: {type: Number,required: true,unique: true},
  title: {type: String,required: true},
  message: { type: String,required: true},
  publishedDate: {type: Date,default: Date.now},
  createdBy: {type: String,required: true}});

module.exports = mongoose.model('Announcement', announcementSchema);
