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
						 User.update({id:req.session.passport.user},{Invisible:true,DaysToDelete:365}).
						 exec(function afterwards(err, updated){
							 var schedule = require('node-schedule');
							//var date = new Date(2012, 11, 21, 5, 30, 0);
								var rule = new schedule.RecurrenceRule();
								//rulehour = 17;
							rule.second=43;
							var j = schedule.scheduleJob
							(rule,
							 function(usr){
						User.find({id:usr}).
					exec(function afterwards(err, nowupdated){
						console.log("usr "+usr);
						console.log(JSON.stringify(nowupdated));
							nowupdated[0].DaysToDelete=nowupdated[0].DaysToDelete-1;
								console.log(nowupdatedusr+"has "+nowupdated[0].DaysToDelete+"days left");
								nowupdated[0].save();
								});
								}.bind
								(updated[0].id));
							 
						 res.redirect("/DeletedAccount");
						
						 

				})
			}
		}
	}
}
};

