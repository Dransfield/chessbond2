/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	DeleteAccount:function(req,res){
		if(req.session){
			if(req.session.passport){
				if(req.session.passport.user){
						 Chessgame.update({id:req.session.passport.user},{Invisible:true}).
						 exec(function afterwards(err, updated){
						 res.redirect("/DeletedAccount");
						 }
						 

				}
			}
		}
	}
};

