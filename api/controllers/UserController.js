/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	banUser:function(req,res){
		 User.update({id:req.param('banneduser')},{tempBan:true,banTime:req.param('bantime'),banStartedAt:Date.now()}).
		 exec(function afterwards(err, updated){
			 console.log(updated);
						 console.log("banned user "+req.param('banneduser'));
						 res.ok();
						 });
						
	},
	unbanUser:function(req,res){
		 User.update({id:req.param('banneduser')},{tempBan:false}).
		 exec(function afterwards(err, updated){
			// console.log(updated);
						 console.log("banned user "+req.param('banneduser'));
						 res.ok();
						 });
						
	},
	visitedWholeSite:function(req,res){
		 User.update({id:req.param('person')},{lastTimeVisitedWholeSite:req.param('theDate')}).
		 exec(function afterwards(err, updated){
			// console.log(updated);
						// console.log(" user visited"+updated[0].lastTimeVisitedWholeSite);
						 res.ok();
						 });
						
	},
	updateProfile:function(req,res){
		//{acc:usracc,field:words,datas:Accounts[usracc][words]},
		
		User.update({id:req.param('acc')},{ProfileUpdated:req.param('profupdate')})
		.exec(function afterwards(err,updated){
			//console.log("hello");
			//console.log(updated);
			//console.log(err);
			return res.send(updated);
		});
	},
	updateLoggedInTime:function(req,res){
		User.update({id:req.param('acc')},{Lastlogin:req.param('loginTime')})
		.exec(function afterwards(err,updated){
		return res.ok();	
		});
	
	},
	UndeleteAccount:function(req,res){
		if(req.session){
			if(req.session.passport){
				if(req.session.passport.user){
						 User.update({id:req.session.passport.user},{Invisible:false,MarkedForDeletion:false}).
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
						 User.update({id:req.session.passport.user},{Invisible:true,DaysToDelete:365,MarkedForDeletion:true}).
						 exec(function afterwards(err, updated){
						
						 res.redirect("/DeletedAccount");
						
						 

				})
			}
		}
	}
}
};

