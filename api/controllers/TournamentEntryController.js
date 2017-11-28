/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	joinTournament:function(req,res){
	console.log("tourn entry join");
	
	
	CurrentTournamententry.find({player:req.param('player')}).
		exec(function afterwards(questionErr,questionRecords)
		{
	
			if(questionErr)
			{
			console.log("questionErr"+questionErr);
			}
	
			console.log("questionRecords "+questionRecords);
			console.log("questionRecords length "+questionRecords.length);
			var tournLookingFor;
			
			if (questionRecords && questionRecords.length>0)
			{tournLookingFor=questionRecords[0].tournid;}
			
			
			Tournament.find({id:tournLookingFor}).exec
			(function afterwards(findTournamentErr,findTournamentRecords)
			{
	
				if (!findTournamentRecords || findTournamentRecords.length==0)
				{
							
					CurrentTournamententry.destroy({player:req.param('player')}).
					exec(function afterwards(questionErr,questionRecords)
					{
						
					});		
					
			
					CurrentTournamententry.create({player:req.param('player'),tournid:req.param('tourny')}).
					exec(function afterwards(currentErr, currentRecords)
					{
			
					});
	
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
							if(records3)
							{
							console.log("records3 "+JSON.stringify(records3));		
								
							console.log("records3[0] "+JSON.stringify(records3[0]));		
							sails.sockets.broadcast('im online', 'tournament entries',{tournID:records3[0].id,players:records3[0].players});
							return res.send(200,"Successfully joined tournament");
							}
							else
							{return res.send(404,"Tournament doesnt exist anymore");
							}
						});
					});
				
				});
	
		}
		else
		{
			return res.send(404,"Sorry, You are already actively participating in another live tournament and you can join another only after it is completed. ");
		}
		
		});
	});
}
};

