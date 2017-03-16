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
							 var date =Date.now()+2000;
							 //var date = new Date(2012, 11, 21, 5, 30, 0);

								var j = schedule.scheduleJob(date, function(){
								console.log('The world is going to end today.');
								});
							 
						 res.redirect("/DeletedAccount");
						 });
						 

				}
			}
		}
	}
};

