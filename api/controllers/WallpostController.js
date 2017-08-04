/**
 * ChatmessageController
 *
 * @description :: Server-side logic for managing chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sawmessage:function(req,res){
			Wallpost.update({id:req.param('id')},{unread:"false"}).exec
		(
		function (err, records) 
			{
				console.log(req.param('id'));
				console.log("message is seen "+records[0]);
				console.log("records[0].intendedFor "+records[0].intendedFor);
				sails.sockets.broadcast(records[0].intendedFor,'seenmessage', records[0].id);
						
				return res.ok();
			});
	},
	wallpost:function(req,res){
		
		Wallpost.create({unread:'true',replyto:req.param('ReplyTo'),content:req.param('content'),sender:req.param('sender'),reciever:req.param('reciever'),groupid:req.param('grpid'),messagetype:req.param('messagetype'),intendedFor:req.param('intendedFor')}).exec
		(
			function (err, records) 
			{
				if(req.param('messagetype')=="Perm Message")
				{
		
				PrivateConversation.findOne
				({id: req.param('grpid')},function foundPC(err,pc)
					{
						if (!err)
						{
							if(pc)
							{	
							sails.sockets.broadcast('/msgroom/'+req.param('grpid'),'WallPost', records);
						
			
							var reciever;
			
								if(pc.Talker1==req.param('sender'))
								{
								reciever=pc.Talker2;
								}
			
								if(pc.Talker2==req.param('sender'))
								{	
								reciever=pc.Talker1;
								}
			
								Notification.create({reciever:reciever,msg:"New Private Message Recieved",adr:'/myprofilemg'})//+req.param('grpid')})
								.exec(
									function (err, records) 
									{

									//sails.sockets.broadcast(records.reciever,'notification', records);
	
									
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
				//	sails.sockets.broadcast(records1.reciever,'notification', records1);
					}
				);
					
			return res.ok();
			}	
			
			if(req.param('messagetype')=="chesschat")
			{
				console.log("message type is chesschat");
			sails.sockets.broadcast('/humanvshuman/'+req.param('grpid'),'WallPost', records);
				Notification.create({reciever:req.param('grpid'),msg:"New Game Chat Message Recieved",adr:'/humanvshuman/'+req.param('grpid')}).exec
				(
					function (err, records1) 
					{
					//sails.sockets.broadcast(records1.reciever,'notification', records1);
					}
				);
					
			return res.ok();
			}	
			
			
			
			
		
	
	}
	);
}
};

