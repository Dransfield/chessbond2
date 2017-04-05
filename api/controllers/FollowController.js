/**
 * ChatmessageController
 *
 * @description :: Server-side logic for managing chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		New:function(req,res){
		//console.log(req.param('user')+" is "+req.param('idlestatus'));
	sails.sockets.broadcast(req.param('Follower'),'FollowStarted', {user:req.param('Followed'),id:req.param('id')});
	sails.sockets.broadcast(req.param('Followed'),'FollowStarted', {user:req.param('Follower'),id:req.param('id')});
	
	}
};

