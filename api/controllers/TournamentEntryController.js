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
	
			Tournament.find({id:questionRecords[0].tournid}).exec
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
						console.log("records3 "+JSON.stringify(records3[0]));		
						sails.sockets.broadcast('im online', 'tournament entries',{tournID:records3[0].id,players:records3[0].players});
						return res.send("Successfully joined tournament");
						});
					});
				
				});
	
		}
		else
		{
			return res.send("Already in a tournament");
		}
		
		});
	});
}
};

