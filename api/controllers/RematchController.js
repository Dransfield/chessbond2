/**
 * RematchController
 *
 * @description :: Server-side logic for managing rematches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function makeGame(rem)

{
		
				MakeGame(rem.Player1,rem.Player2,p1color,gamecat,gametype,num1,num2)
				
		
	
	
}

module.exports = {
	
	WantRematch: function(req,res)  {
		Rematch.findOne({game:req.param('gam')}, function foundRematch(err, rem) {
			if(rem)
			{
				if(rem.Player1)	
				{
					if(rem.Player1!=req.param('me'))
					{
					rem.Player2=req.param('me');
					makeGame(rem);
					}
				}
			}
			else
			{
			
			Rematch.create({Player1:req.param('me'),game:req.param('gam'),gametype:req.param('gametype'),gamecat:req.param('gamecat'),gametime('gametime')}).exec(function (err, records) {
			console.log("sending socket broadcast");
			sails.sockets.broadcast(req.param('gam'),'rematch', {content:req.param('me')});
		
			return res.ok();
			});
				
			}
		});
		
	}
};

