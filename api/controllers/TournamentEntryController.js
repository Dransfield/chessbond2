/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	leaveTournament:function(req,res){
	/*
		CurrentTournamententry.destroy({tournid:req.param('tourny'),player:req.param('player')}).
		exec(function afterwards(currentErr,currentRecords)
		{*/
			
			Tournamententry.destroy({tournid:req.param('tourny'),player:req.param('player')}).
			exec(function afterwards(tErr,tRecords)
			{
			
			if(tErr || currentErr)
			{
			
				if(tErr)
				{	
				return res.send(404,tErr);
				}
				
				if(currentErr)
				{	
				return res.send(404,currentErr);
				}
				
			}
			else
			{
			
				if(tRecords)
				{	
				
				Tournamententry.find({tournid:req.param('tourny')}).
						exec(function afterwards(err2,records2)
						{
				//			console.log("records2.length "+records2.length);
							Tournament.update({id:req.param('tourny')},{players:records2.length}).
							exec(function afterwards(err3,records3)
							{
				
							return res.send(200,"Successfully left tournament.");
				
							});
						});	
				
				}
				else
				{	
				return res.send(404,"No tournament entry found.");
				}
			
			}
			
			
			});
		
		//});
	
		
	
	
	},
	
	joinTournament:function(req,res){
	console.log("tourn entry join");
	
	
		Tournament.find({id:oldTourn}).exec
			(function afterwards(oldTournErr,oldTournRecords)
			{
			if(oldTournErr)
			{
			console.log("oldTournErr"+oldTournErr);
			}
	
			console.log("questionRecords "+oldTournRecords);
			console.log("questionRecords length "+oldTournRecords.length);
			var tournLookingFor=req.param('tourny');
			console.log('tournid'+req.param('tourny'));
			
			if (oldTournRecords && oldTournRecords.length>0)
			
			{
			
			return res.send(404,"Sorry, You are already actively participating in another live tournament and you can join another only after it is completed. ");
			
			
			}
			
			else
			
			{
			
				/*CurrentTournamententry.destroy({id:currentID}).exec
				(function afterwards(doneErr,doneRecords)
				{
				});
				*/
				Tournamententry.destroy({player:req.param('player'),tournid:oldTourn}).exec
				(function afterwards(doneErr,doneRecords)
				{
				});
				
			}
			
			Tournament.find({id:tournLookingFor}).exec
			(function afterwards(findTournamentErr,findTournamentRecords)
			{
	
				if (!findTournamentRecords || findTournamentRecords.length==0)
				{
							
						return res.send(404,"Tournament doesnt exist anymore");
						
				}
				else
				{
			
					/*CurrentTournamententry.create({player:req.param('player'),tournid:req.param('tourny')}).
					exec(function afterwards(currentErr, currentRecords)
					{
			
					});
					*/
					Tournamententry.create({player:req.param('player'),tournid:req.param('tourny')}).
					exec(function afterwards(err, records)
					{
				
						console.log("error "+err);
						//console.log(JSON.stringify(records));		
				
						Tournamententry.find({tournid:req.param('tourny')}).
						exec(function afterwards(err2,records2)
						{
							console.log("records2.length "+records2.length);
							Tournament.update({id:req.param('tourny')},{players:records2.length}).
							exec(function afterwards(err3,records3)
							{
								if(records3 && records3[0])
								{
								console.log("records3 "+JSON.stringify(records3));		
								console.log("records3[0] "+JSON.stringify(records3[0]));		
								//sails.sockets.broadcast('im online', 'tournament entries',{tournID:records3[0].id,players:records3[0].players});
								sails.sockets.broadcast(records3[0].id, 'tournament entries',{tournID:records3[0].id,players:records3[0].players});
								
								return res.send(200,"Successfully joined tournament");
								}
								else
								{return res.send(404,"Tournament doesnt exist anymore");
								}
							});
						});
				
					});
	
				}
			
		
			});
		});
	
	}
};

