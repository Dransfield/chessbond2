/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	UndeleteAccount:function(req,res){
		if(req.session){
			if(req.session.passport){
				if(req.session.passport.user){
						 User.update({id:req.session.passport.user},{Invisible:false}).
						 exec(function afterwards(err, updated){
						 res.redirect("/UndeletedAccount");
						 });
						 

				}
			}
		}
	},
	DeleteAccount:function(req,res){
		if(req.session){
			if(req.session.passport){
				if(req.session.passport.user){
						 User.update({id:req.session.passport.user},{Invisible:true}).
						 exec(function afterwards(err, updated){
							 var schedule = require('node-schedule');
							//var date = new Date(2012, 11, 21, 5, 30, 0);
								var date=new Date();
								console.log(date);
								date.setSeconds(date.getSeconds() + 10);
								console.log(date);
							var j = schedule.scheduleJob(date, function(updated){
								console.log('delete '+updated);
								})(updated);
							 
						 res.redirect("/DeletedAccount");
						 });
						 

				}
			}
		}
	}
};

