/**
 * ChatmessageController
 *
 * @description :: Server-side logic for managing chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		New:function(req,res){
		//console.log(req.param('user')+" is "+req.param('idlestatus'));
	sails.sockets.broadcast(req.param('follower'),'FollowStarted', {user:req.param('followed'),id:req.param('id')});
	sails.sockets.broadcast(req.param('followed'),'FollowStarted', {user:req.param('follower'),id:req.param('id')});
	
	}
};

