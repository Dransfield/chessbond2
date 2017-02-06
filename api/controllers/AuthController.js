/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    
        logingoogle:function(req,res){
passport.authenticate('google',{ scope: ['profile','email'] })(req, res);
	},
	googlecallback:function(req,res)
	{
	/*	if(req.session)
		{
		console.log("req.session:");
		var keys = Object.keys(req.session);
		for (x in keys)
		{console.log(JSON.stringify(keys[x]));}
		}
		
		if(req.session.passport)
		{
		console.log("req.session.passport");
		var keys = Object.keys(req.session.passport);
		for (x in keys)
		{console.log(JSON.stringify(keys[x]));}
		}
		
		if(req.session.cookie)
		{
		console.log("req.session.cookie");
	
		var keys = Object.keys(req.session.cookie);
		for (x in keys)
		{console.log(JSON.stringify(keys[x]));}
		}
		//console.log("REQ"+JSON.stringify(req));
		//console.log("RES"+JSON.stringify(res));
		*/
		 passport.authenticate('google',{
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash: true
        })(req, res);;
	},
    
    logintwitter:function(req,res){
passport.authenticate('twitter')(req, res);
	},
	twittercallback:function(req,res)
	{
		
		 passport.authenticate('twitter',{
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash: true
        })(req, res);;
	},
	loginfacebook:function(req,res){
passport.authenticate('facebook',{ scope : [ 'email','user_hometown'] })(req, res);
	},
	facebookcallback:function(req,res)
	{
		
		 passport.authenticate('facebook',{
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash: true
        })(req, res);;
	},
register: function (req, res) {
    var params = {name: req.param('name'),email: req.param('email'), password: req.param('password')};
 
    User.create(params).exec(function(err, user) {
      if (err) {
        res.serverError(err);
      }
      else {
        res.send(user);
      }
    });
  },
    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        console.log("logging out");
        req.session.destroy();
        
        res.redirect('/');
        
    }
};


