/**
 * RematchController
 *
 * @description :: Server-side logic for managing rematches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 function MakeGame(p1,p2,p1color,gamecat,gametype,num1,num2,msg)
 {
	 console.log("makegame function");
	User.find({
	id : [p1,p2]
	}).exec(function (err, players){
		
		if (err) return res.negotiate(err);
		
		// If session refers to a user who no longer exists, still allow logout.
			if (!players) {
			console.log('Session refers to a user who no longer exists.');
			sentresponse=true;
			return res.notFound();
			}
		
		var p1Record;
		var p2Record;
		
		if (players[0].id==p1)
		{
		p1Record=players[0];
		p2Record=players[1];
		}
		else
		{
		p1Record=players[1];
		p2Record=players[0];
		}
		
		if (p1==p2)
		{
		p1Record=players[0];
		p2Record=players[0];
		}
		
		var p2color;
		if(p1color=='White')
		{p2color='Black';}
		else
		{p2color='White';}
		
		p1Name=p1Record.name;
		p1ID=p1Record.id;
		p1ELO=p1Record.ELO;
		p1CategoryELO=p1Record['rating'+p1color+gamecat];
		
		p2Name=p2Record.name;
		p2ID=p2Record.id;
		p2ELO=p2Record.ELO;
		p2CategoryELO=p2Record['rating'+p2color+gamecat];
		
		console.log(p1Name+" "+p2Name);
		
		
		Chessgame.create({Player1ELO:p1ELO,Player1CategoryELO:p1CategoryELO,Player2ELO:p2ELO,Player2CategoryELO:p2CategoryELO,GameCategory:gamecat,Player1TimeLimit:num1,Player1TimeLeft:num1,Player2TimeLimit:num2,Player2TimeLeft:num2,GameType:gametype,Move:1,Player1Color:p1color,Player1:p1ID,Player2:p2ID,Player1Name:p1Name,Player2Name:p2Name,message:msg}).exec(
			
			function (err, records) {
				if(err){
			console.log('Cant create joined game.');
			//console.log(JSON.stringify(err));
			}
			console.log("records"+JSON.stringify(records));
			//console.log(records);
			console.log("broadcasting to "+p1ID);
			  sails.sockets.broadcast(p1ID,'newmygameevent', records);
			  if (p1ID!=p2ID)
			{
			  sails.sockets.broadcast(p2ID,'newmygameevent', records);
			}
			
		
			//return res.json(records);
			
			
			});
			
			
			
			
			
			
			
			
			//game.destroy();
			}); 
	 
	}

module.exports = {
	
	WantRematch: function(req,res)  {
		Rematch.findOne({game:req.param('gam')}, function foundRematch(err, rem) {
			if(rem)
			{
				if(rem.p1color=='White')
				{rem.p1color='Black';}
				else
				{rem.p1color='White';}
				
					console.log("make game "+rem.Player1+" "+rem.Player2);
				MakeGame(rem.Player1,rem.Player2,rem.p1color,rem.gamecat,rem.gametype,rem.gametime,rem.gametime,rem.msg);
			}
			else
			{
			
				Chessgame.findOne({id:req.param('gam')},function foundGame(err2,gam){
					Rematch.create({Player1:gam.Player1,Player2:gam.Player2,p1color:gam.p1color,game:gam.id,gametype:gam.GameType,gamecat:gam.GameCategory,gametime:gam.Player1TimeLimit,sentence:gam.Result,msg:req.param('msg')}).exec(function (err, records) {
						console.log("sending socket broadcast");
			
						if (req.param('me')==gam.Player1)
						{records.Player1WantsRematch=true;}
						if (req.param('me')==gam.Player2)
						{records.Player2WantsRematch=true;}
			
						records.save();
						sails.sockets.broadcast('/humanvshumannew/'+req.param('gam'),'rematch', {content:req.param('me')});
					});
		
			
				});
				
			}
		});
			
	}
};


