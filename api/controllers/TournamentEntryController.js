/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	join:function(req,res){
		
	Tournamententry.Create({player:req.param['player'],tournid:req.param['tourny']}).
	exec(function afterwards(err, records)
			{
				
			});
	
	Tournamententry.find({tournid:req.param['tourny']}).
	exec(function afterwards(err,records)
	{
	Tournament.update({id:req.param['tourny']},{players:records.length}).
	exec(function afterwards(err,records)
		{
		
		});
	
	
	}
	});
	
};

