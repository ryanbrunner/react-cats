var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
  url: String
});

module.exports = mongoose.model('Image', ImageSchema);
