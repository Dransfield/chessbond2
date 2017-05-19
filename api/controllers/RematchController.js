/**
 * RematchController
 *
 * @description :: Server-side logic for managing rematches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function makeGame(remid)

{
		Rematch.findOne({id:remid}, function foundRematch(err, rem) {
			
			
			
			
			Chessgame.create({Player1ELO:OppoELO,Player1CategoryELO:OppoCategoryELO,Player2ELO:MyELO,Player2CategoryELO:MyCategoryELO,GameCategory:ThisGameCat,Player1TimeLimit:num1,Player1TimeLeft:num1,Player2TimeLimit:num2,Player2TimeLeft:num1,GameType:GameTypeID,Move:1,Player1Color:OppoColor,Player1:OppoID,Player2:MyID,Player1Name:OppoName,Player2Name:MyName}).exec(
				
				
		
			function (err, records) {
				if(err){
				}
				
				MakeGame(rem.Player1,rem.Player2);
				});
		
		
		});
	
	
}

module.exports = {
	
	WantRematch: function(req,res)  {
		Rematch.findOne({game:req.param('gam')}, function foundRematch(err, rem) {
			if(rem)
			{
				if(rem.Player1)	
				{
					if(rem.Player1!=req.me)
					{
					rem.Player2=req.me;
					makeGame(rem.id);
					}
				}
			}
			else
			{
			
			Rematch.create({Player1:req.param('me'),game:req.param('gam')}).exec(function (err, records) {
			console.log("sending socket broadcast");
			sails.sockets.broadcast(req.param('gam'),'rematch', {content:req.param('me')});
		
			return res.ok();
			});
				
			}
		});
		
	}
};

