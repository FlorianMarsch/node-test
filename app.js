var express = require('express');
var passport = require('passport');
var expressSession = require('express-session');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./db')();
var SessionStore = require('connect-mongo')(expressSession);

var redis = require("redis");
var cache  = redis.createClient(process.env.REDIS_URL);

module.exports = function(){

	
app.set('secretKey', (process.env.SECRET_KEY || 'mySecretKey'));

app.use(expressSession(
		{
			secret: app.get('secretKey'),
			store: new SessionStore({ mongooseConnection: mongoose.connection })
		}
		));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());





    


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var flash = require('connect-flash');
app.use(flash());




//Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var server = {'app':app};

server.get=function(urlPath, ejsView){
	console.log("register '"+urlPath +"' as ejs view : '"+ejsView+"'");
	server.app.get(urlPath, function(request, response) {
		
		var user = {'id':undefined, 'username':undefined};
		if(request.user){
			
			user.id = request.user._id;
			user.username = request.user.username;
			
		}
		response.render(ejsView, {
	        'userId': user.id,
	        'userName': user.username
	    });
	});
};

server.mock=function(urlPath, resourceName){
	console.log("register mock '"+urlPath +"' -> : '"+resourceName+"'");
	server.app.get(urlPath, function(request, response) {
		response.header("Content-Type", "application/json");
		response.sendFile( __dirname + "/mock/" +resourceName+".json");
	});
};

server.protect=function(urlPath, resourceName){
	console.log("register protected mock '"+urlPath +"' -> : '"+resourceName+"'");
	server.app.get(urlPath, function(request, response) {

		response.header("Content-Type", "application/json");
		if (request.isAuthenticated()){
			response.sendFile( __dirname + "/mock/"+request.user._id+"/" +resourceName+".json");
		}else{
			response.send('[]');
		}
	});
};

server.fromCache=function(urlPath, cacheName){
	console.log("register protected cache '"+urlPath +"' -> : '"+resourceName+"'");
	server.app.get(urlPath, function(request, response) {

		response.header("Content-Type", "application/json");
		if (request.isAuthenticated()){
			cache.get("cacheName",function(err, data){
				if(err){
					response.send('[]');
				}else{
					response.send(data);
				}
			}
		}else{
			response.send('[]');
		}
	});
};

return server;
}
