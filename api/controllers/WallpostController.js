/**
 * ChatmessageController
 *
 * @description :: Server-side logic for managing chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	wallpost:function(req,res){
		
		Wallpost.create({unread:'true',replyto:req.param('ReplyTo'),content:req.param('content'),sender:req.param('sender'),reciever:req.param('reciever')}).exec
		(
			function (err, records) 
			{
				if(req.param('messagetype')=="Private Conversation")
				{
		
				privateconversation.findOne
				({id: req.param('grpid')},function foundPC(err,pc)
					{
						if (!err)
						{
							if(pc)
							{	
							sails.sockets.broadcast('/privateconversation/'+req.param('grpid'),'WallPost', records);
						
			
							var reciever;
			
								if(pc.Talker1==req.param('sender'))
								{
								reciever=pc.Talker2;
								}
			
								if(pc.Talker2==req.param('sender'))
								{	
								reciever=pc.Talker1;
								}
			
								Notification.create({reciever:reciever,msg:"New Private Message Recieved",adr:'/privateconversation/'+req.param('grpid')})
								.exec(
									function (err, records) 
									{

									sails.sockets.broadcast(records.reciever,'notification', records);
	
									return res.ok();
									}
								);
							}
						}
		
					}
				);
				return res.ok();
			}	
		}
	);
	}
	
};

