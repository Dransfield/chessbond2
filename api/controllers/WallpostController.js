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
				//console.log(req.param('id'));
				console.log("message is seen "+records[0].id);
				console.log("records[0].intendedFor "+records[0].groupid);
				console.log("sending to  "+req.param('location'));
				sails.sockets.broadcast(req.param('location'),'seenmessage', records[0].id);
						
				return res.ok();
			});
	},
	
	wantsToDelete:function(req,res){
		
		Wallpost.findOne({id:req.param('id')}).exec
		(
		function (err,records)
		{
			//console.log(JSON.stringify(records));
			var deleter=req.param('deleter');
			//console.log("deleter "+deleter);
			//console.log("sender"+records.sender);
			
		if(deleter==records.sender)
			{	
			//	console.log(1);
			Wallpost.update({id:req.param('id')},{senderWantsToDelete:true}).exec
			(
			function(err3,records3)
			{
			
			if(records3[0].intendedForWantsToDelete && records3[0].senderWantsToDelete)
			{
				//console.log(3);
				Wallpost.destroy({id:req.param('id')}).exec
				(function(err2,records2){
					return res.ok();
					});
			}
			else
			{return res.ok();}
		});	
		}
		
		if(deleter==records.intendedFor)
			{	
				//console.log(2);
			Wallpost.update({id:req.param('id')},{intendedForWantsToDelete:true}).exec
			(
			function(err3,records3)
			{
			
			if(records3[0].intendedForWantsToDelete && records3[0].senderWantsToDelete)
			{
				//console.log(4);
				Wallpost.destroy({id:req.param('id')}).exec
				(function(err2,records2){
					return res.ok();
					});
			}
			else
			{
				//console.log("nope");
				//console.log(records3[0].intendedForWantsToDelete);
				//console.log(records3[0].senderWantsToDelete);
				
				
				return res.ok();}
		});	
		}
		
		
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
							console.log(pc.Talker1);
							console.log(records);
							
							sails.sockets.broadcast(pc.Talker1,'Perm Message', records);
							sails.sockets.broadcast(pc.Talker2,'Perm Message', records);
							
							//sails.sockets.broadcast('/msgroom/'+req.param('grpid'),'WallPost', records);
						
			
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
									function (err, records2) 
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
				console.log("sending to "+req.param('location'));
				sails.sockets.broadcast(req.param('location'),'WallPost', records);
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
			sails.sockets.broadcast('/humanvshumannew/'+req.param('grpid'),'WallPost', records);
				Notification.create({reciever:req.param('grpid'),msg:"New Game Chat Message Recieved",adr:'/humanvshumannew/'+req.param('grpid')}).exec
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

