/**
 * ChatmessageController
 *
 * @description :: Server-side logic for managing chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	wallpost:function(req,res){
			
	Wallpost.create({room:req.param('roomName'),content:req.param('content'),sender:req.param('sender'),sendername:req.param('sendername'),reciever:req.param('reciever')}).exec(function (err, records) {
	sails.sockets.broadcast(records.room,'WallPost', {room:records.room,content: records.content });
	
	 return res.ok();
});
	}
	
};

