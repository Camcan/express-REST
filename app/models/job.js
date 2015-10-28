//Initialize

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	title:String,
	description:String

});

module.exports = mongoose.model('Job', JobSchema);
