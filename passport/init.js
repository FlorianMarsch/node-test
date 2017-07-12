var login = require('./login');
var signup = require('./signup');

module.exports = function(passport){
	

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function(id, done) {
    	console.log('deserializing user:',id);
        done(null, JSON.parse(id));
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

    
}