/**
 * ChatmessageController
 *
 * @description :: Server-side logic for managing chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		New:function(req,res){
		//console.log(req.param('user')+" is "+req.param('idlestatus'));
	sails.sockets.broadcast(req.param('Talker1'),'PrivateConversationStarted', {user:req.param('Talker2')});
	sails.sockets.broadcast(req.param('Talker2'),'PrivateConversationStarted', {user:req.param('Talker1')});
	
	}
};

