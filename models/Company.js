var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Company = new Schema({
  company : String,
  link: String
});

mongoose.model('Company', Company);