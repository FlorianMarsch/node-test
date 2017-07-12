var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(passport){

	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	  },
	  function(req, username, password, done) { 
		  console.log('logged in : '+username);
		return done(null, {'name':username}); 
	  }));


    
}