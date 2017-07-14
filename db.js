var mongoose = require('mongoose');

module.exports = function(){
	var config = {'url' : 'mongodb://localhost/test'};
	if(process.env.MONGODB_URI){
		config.url = process.env.MONGODB_URI;
	}
	console.log("Use Mongo config :",config);
	mongoose.connect(config.url);
	return mongoose;
}