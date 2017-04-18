/**
 * ChatmessageController
 *
 * @description :: Server-side logic for managing chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	wallpost:function(req,res){
		
		Wallpost.create({unread:'true',replyto:req.param('ReplyTo'),content:req.param('content'),sender:req.param('sender'),reciever:req.param('reciever'),groupid:req.param('grpid'),messagetype:req.param('messagetype')}).exec
		(
			function (err, records) 
			{
				if(req.param('messagetype')=="Private Conversation")
				{
		
				PrivateConversation.findOne
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
			
								Notification.create({reciever:reciever,msg:"New Private Message Recieved",adr:'/seeprivateconversation/'+req.param('grpid')})
								.exec(
									function (err, records) 
									{

									sails.sockets.broadcast(records.reciever,'notification', records);
	
									
									}
								);
							}
						}
		
					}
				 );
			 }
				
			if(req.param('messagetype')=="wall")
			{
				console.log("message type is wall");
			sails.sockets.broadcast('/profile/'+req.param('grpid'),'WallPost', records);
				Notification.create({reciever:req.param('grpid'),msg:"New Wall Post Recieved",adr:'/profile/'+req.param('grpid')}).exec
				(
					function (err, records1) 
					{
					sails.sockets.broadcast(records1.reciever,'notification', records1);
					}
				);
					
			return res.ok();
			}	
			
			
			
			
			
		
	
	}
	);
}
};

