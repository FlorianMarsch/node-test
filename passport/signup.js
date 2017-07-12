var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	  },
	  function(req, username, password, done) {
		return done(null, {'name':username});
	 }));

}