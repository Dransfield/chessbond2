/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	join:function(req,res){
	console.log("tourn entry join");
	
	
	CurrentTournamententry.find({player:req.param('player')).
	exec(function afterwards(questionErr,questionRecords)
	{
	
	if(questionErr)
	{
		console.log("questionErr"+questionErr);
	}
	
	if (!questionRecords || questionRecords.length==0)
	{
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
				});
			});
				
		});
	
	}
	else
	{return res.error("Already in a tournament");}
	});
}
};

