/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	join:function(req,res){
		console.log("tourn entry join");
	Tournamententry.create({player:req.param('player'),tournid:req.param('tourny')}).
	exec(function afterwards(err, records)
			{
				
		console.log("error "+err);
		//console.log(JSON.stringify(records));		
				
				Tournamententry.find({tournid:req.param('tourny')}).
	exec(function afterwards(err2,records2)
	{
	Tournament.update({id:req.param('tourny')},{players:records.length}).
	exec(function afterwards(err3,records3)
		{
		console.log("records3 "+JSON.stringify(records3));		
			
			sails.sockets.broadcast('im online', 'tournament entries',{tournID:records3.id,players:records3.players});
										
		});
	
	
	
	});
				
			});
	
	
}
};

