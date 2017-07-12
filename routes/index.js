var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/user',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/user',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	router.get('/user', function(req, res) {
		
		if (req.isAuthenticated()){
			res.send({'user':req.user, 'auth':true});
		}else{
			res.send({'user':undefined, 'auth':false});
		}
		   
	});
	
	router.get('/flash', function(req, res) {
		
		
			res.send({'messages':req.flash('message'), 'flash':true});
		
		   
	});

	return router;
}
