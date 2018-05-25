/**
 * ChessgameController
 *
 * @description :: Server-side logic for managing chessgames
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 function DoDraw(player1,player2,player1color,player2color,gamecat,GameID,GameDescriptor)
	{
	var elo = require('elo-rank')(15);
	console.log("player1 "+player1);
	console.log("player2 "+player2);
	var player1gamecategory;
	var player2gamecategory;

	console.log("got here1");
	player1gamecategory='rating'+player1color+gamecat;
	player2gamecategory='rating'+player2color+gamecat;
	
	
  
  User.find({
  id : [player1,player2]
	}).exec(function (err, players){
	//console.log("winners and losers:"+JSON.stringify(winnersandlosers));
	console.log("got here2");
	
	var player1Record;
	var player2Record;
	if (player1==players[0].id)
		{
		player1Record=players[0];
		player2Record=players[1];
		}
		else
		{
		player1Record=players[1];
		player2Record=players[0];
		}
	
	if (player1==player2)
	{
		player1Record=players[0];
		player2Record=players[0];
	}
	
	var player1startELO=player1Record.ELO;
	var player2startELO=player2Record.ELO;
	var expectedScoreA = elo.getExpected(player1startELO, player2startELO);
	var expectedScoreB = elo.getExpected(player2startELO, player1startELO);
	
	var player1startcatELO=player1Record[player1gamecategory];
	var player2startcatELO=player2Record[player2gamecategory];
	
	if (!player1Record[player1gamecategory])
	{player1startcatELO=1200;}
	if (!player2Record[player2gamecategory])
	{player2startcatELO=1200;}
	
	var expectedScoreAcat = elo.getExpected(player1startcatELO, player2startcatELO);
	var expectedScoreBcat = elo.getExpected(player2startcatELO, player1startcatELO);
	
	if (player1!=player2)
	{
	
	player1Record.ELO = elo.updateRating(expectedScoreA,0.5,player1startELO);
	player2Record.ELO = elo.updateRating(expectedScoreB,0.5,player2startELO);
	
	player1Record[player1gamecategory] = elo.updateRating(expectedScoreAcat,0.5,player1startcatELO);
	player2Record[player2gamecategory] = elo.updateRating(expectedScoreBcat,0.5,player2startcatELO);
	
		console.log("got here3");

	player1Record.save();
	player2Record.save();
	}
		console.log("got here4");

	//var Res1=winnerRecord.name+"'s ELO score went from "+winnerstartELO+" to "+winnerRecord.ELO;
	//var Res2=loserRecord.name+"'s ELO score went from "+loserstartELO+" to "+loserRecord.ELO;
	var player1eloSentence="";
	console.log("player1Record.ELO "+player1Record.ELO);
	console.log("player1startELO "+player1startELO);
	if(player1Record.ELO>player1startELO)
	{player1eloSentence="+"+(player1Record.ELO-player1startELO);}
	else
	{player1eloSentence=(player1Record.ELO-player1startELO);}
	
	var player2eloSentence="";
	console.log("player2Record.ELO "+player2Record.ELO);
	console.log("player2startELO "+player2startELO);
	
	if(player2Record.ELO>player2startELO)
	{player2eloSentence="+"+(player2Record.ELO-player2startELO);}
	else
	{player2eloSentence=(player2Record.ELO-player2startELO);}
	
	console.log("LosereloSentence "+player2eloSentence);
	
	var player1cateloSentence="";
	if(player1Record[player1gamecategory]>player1startcatELO)
	{player1cateloSentence="+"+(player1Record[player1gamecategory]-player1startcatELO);}
	else
	{player1cateloSentence=(player1Record[player1gamecategory]-player1startcatELO);}
	
	var player2cateloSentence="";
	if(player2Record[player2gamecategory]>player2startcatELO)
	{player2cateloSentence="+"+(player2Record[player2gamecategory]-player2startcatELO);}
	else
	{player2cateloSentence=(player2Record[player2gamecategory]-player2startcatELO);}
	
		var resultstring="";
	
	resultstring+="<span class='redtext'>"+player1Record.name+"</span> Drew by <span class='redtext'>"+GameDescriptor+"</span><span> against </span><span class='redtext'>"+player2Record.name+"</span><br><span>Result:</span><span class='redtext'>Draw</span><br>";
	
	
	resultstring+="<span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+player1Record.name+"</span><span>:</span> <span class='redtext'>"+player1Record.ELO+" ("+player1eloSentence+")</span>";
	resultstring+="<br><span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+player2Record.name+"</span><span>:</span> <span class='redtext'>"+player2Record.ELO+" ("+player2eloSentence+")</span>";
	
	
	resultstring+="<br><span>New</span> <span class='redtext'>"+player1color+" "+gamecat+" ELO ratings </span><span>of</span><span class='redtext'> "+player1Record.name+"</span><span>:</span> <span class='redtext'>"+player1Record[player1gamecategory]+" ("+player1cateloSentence+")</span>";
	resultstring+="<br><span>New</span> <span class='redtext'>"+player2color+" "+gamecat+" ELO ratings </span><span>of</span><span class='redtext'> "+player2Record.name+"</span><span>:</span> <span class='redtext'>"+player2Record[player2gamecategory]+" ("+player2cateloSentence+")</span>";
	
	var tts="Status:<span class='redtext'>Game over</span>";
	
	
	
	
	

	Chessgame.update({id:GameID},{Result:resultstring,TurnTakerSentence:tts,Player1ELOafter:player1Record.ELO,Player2ELOafter:player2Record.ELO,Player1CategoryELOafter:player1Record[player1gamecategory],Player2CategoryELOafter:player2Record[player2gamecategory]}).exec(function afterwards(err, updated){
	//sails.sockets.broadcast(GameID, 'ELOAdjustments',updated);
		sails.sockets.broadcast(GameID, 'chessgamemove',{room:GameID});

	Chatmessage.create({room:GameID,content:resultstring }).exec(function (err, records) {
	sails.sockets.broadcast(GameID,'message', {room:GameID,content: resultstring  });
	
	 
	});
	});
	
	
	});

	};
	
	
	 function DoWithdraw(withdrawer,GameID)
 {
	 var resultstring=withdrawer+" withdrew from the game";
	 Chessgame.update({id:GameID},{Result:resultstring,TurnTakerSentence:'Withdrawal'}).exec(function afterwards(err, updated){
		sails.sockets.broadcast(GameID, 'chessgamemove',{room:GameID});

	Chatmessage.create({room:GameID,content:resultstring }).exec(function (err, records) {
	sails.sockets.broadcast(GameID,'message', {room:GameID,content: resultstring  });
	
	 
	});
	});
	};
	
	
	function DoGameResult(winner,loser,winnercolor,losercolor,gamecat,GameID,timeout,winner1or2)
	{
	var elo = require('elo-rank')(15);
	console.log("winner "+winner);
	console.log("loser "+loser);
	var winnergamecategory;
	var losergamecategory;

	
	winnergamecategory='rating'+winnercolor+gamecat;
	losergamecategory='rating'+losercolor+gamecat;
	
	
  
  User.find({
  id : [winner, loser]
	}).exec(function (err, winnersandlosers){
	//console.log("winners and losers:"+JSON.stringify(winnersandlosers));
	
	var winnerRecord;
	var loserRecord;
	if (winner==winnersandlosers[0].id)
	{winnerRecord=winnersandlosers[0];
		loserRecord=winnersandlosers[1];
		}
		else
		{
		winnerRecord=winnersandlosers[1];
		loserRecord=winnersandlosers[0];
		
		}
	
	if (winner==loser)
	{
		winnerRecord=winnersandlosers[0];
		loserRecord=winnersandlosers[0];
	}
	
	var winnerstartELO=winnerRecord.ELO;
	var loserstartELO=loserRecord.ELO;
	var expectedScoreA = elo.getExpected(winnerstartELO, loserstartELO);
	var expectedScoreB = elo.getExpected(loserstartELO, winnerstartELO);
	
	var winnerstartcatELO=winnerRecord[winnergamecategory];
	var loserstartcatELO=loserRecord[losergamecategory];
	
	if (!winnerRecord[winnergamecategory])
	{winnerstartcatELO=1200;}
	if (!loserRecord[losergamecategory])
	{loserstartcatELO=1200;}
	
	var expectedScoreAcat = elo.getExpected(winnerstartcatELO, loserstartcatELO);
	var expectedScoreBcat = elo.getExpected(loserstartcatELO, winnerstartcatELO);
	
	if (winner!=loser)
	{
	
	winnerRecord.ELO = elo.updateRating(expectedScoreA, 1, winnerstartELO);
	loserRecord.ELO = elo.updateRating(expectedScoreB, 0,loserstartELO);
	
	winnerRecord[winnergamecategory] = elo.updateRating(expectedScoreAcat, 1, winnerstartcatELO);
	loserRecord[losergamecategory] = elo.updateRating(expectedScoreBcat, 0, loserstartcatELO);
	
	console.log("about to save");
	loserRecord.save();
	winnerRecord.save();
	console.log("saved");
	}
	//var Res1=winnerRecord.name+"'s ELO score went from "+winnerstartELO+" to "+winnerRecord.ELO;
	//var Res2=loserRecord.name+"'s ELO score went from "+loserstartELO+" to "+loserRecord.ELO;
	var WinnereloSentence="";
	console.log("winnerRecord.ELO "+winnerRecord.ELO);
	console.log("winnerstartELO "+winnerstartELO);
	if(winnerRecord.ELO>winnerstartELO)
	{WinnereloSentence="+"+(winnerRecord.ELO-winnerstartELO);}
	else
	{WinnereloSentence=(winnerRecord.ELO-winnerstartELO);}
	
	var LosereloSentence="";
	console.log("loserRecord.ELO "+loserRecord.ELO);
	console.log("loserstartELO "+loserstartELO);
	
	if(loserRecord.ELO>loserstartELO)
	{LosereloSentence="+"+(loserRecord.ELO-loserstartELO);}
	else
	{LosereloSentence=(loserRecord.ELO-loserstartELO);}
	
	console.log("LosereloSentence "+LosereloSentence);
	
	var WinnercateloSentence="";
	if(winnerRecord[winnergamecategory]>winnerstartcatELO)
	{WinnercateloSentence="+"+(winnerRecord[winnergamecategory]-winnerstartcatELO);}
	else
	{WinnercateloSentence=(winnerRecord[winnergamecategory]-winnerstartcatELO);}
	
	var LosercateloSentence="";
	if(loserRecord[losergamecategory]>loserstartcatELO)
	{LosercateloSentence="+"+(loserRecord[losergamecategory]-loserstartcatELO);}
	else
	{LosercateloSentence=(loserRecord[losergamecategory]-loserstartcatELO);}
	
	
	var resultstring="";
	
		if (timeout=='false')
	{resultstring+="<span class='redtext'>"+winnerRecord.name+"</span> Won by<span class='redtext'> checkmate</span><span> against </span><span class='redtext'>"+loserRecord.name+"</span><br><span>Result:</span><span class='redtext'>Checkmate</span><br>";}
	else
	{resultstring+="<span class='redtext'>"+winnerRecord.name+"</span> Won by<span class='redtext'> timeout</span><span> against </span><span class='redtext'>"+loserRecord.name+"</span><br><span>Result:</span><span class='redtext'>Timeout</span><br>";}
	
	
	resultstring+="<span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+winnerRecord.name+"</span><span>:</span> <span class='redtext'>"+winnerRecord.ELO+" ("+WinnereloSentence+")</span>";
	resultstring+="<br><span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+loserRecord.name+"</span><span>:</span> <span class='redtext'>"+loserRecord.ELO+" ("+LosereloSentence+")</span>";
	
	console.log("winnergamecategory "+winnergamecategory);
	console.log("losergamecategory "+losergamecategory);
	
	resultstring+="<br><span>New</span> <span class='redtext'>"+winnercolor+" "+gamecat+" ELO ratings </span><span>of</span><span class='redtext'> "+winnerRecord.name+"</span><span>:</span> <span class='redtext'>"+winnerRecord[winnergamecategory]+" ("+WinnercateloSentence+")</span>";
	resultstring+="<br><span>New</span> <span class='redtext'>"+losercolor+" "+gamecat+" ELO ratings </span><span>of</span><span class='redtext'> "+loserRecord.name+"</span><span>:</span> <span class='redtext'>"+loserRecord[losergamecategory]+" ("+LosercateloSentence+")</span>";
	
	var tts="Status:<span class='redtext'>Game over</span>";
	
	var player1Record;
	var player2Record;
	var player1gamecategory;
	var player2gamecategory;
	
	if(winner1or2==1)
	{
		player1Record=winnerRecord;
		player2Record=loserRecord;
		player1gamecategory=winnergamecategory;
		player2gamecategory=losergamecategory;
		
		}
	else
	{
		player2Record=winnerRecord;
		player1Record=loserRecord;
		player2gamecategory=winnergamecategory;
		player1gamecategory=losergamecategory;
		
	}
	
	console.log("winner1or2 "+winner1or2);
	console.log("player1Record "+player1Record);
	console.log("player2Record "+player2Record);
	console.log("player1Record[player1gamecategory] "+player1Record[player1gamecategory]);
	console.log("player2Record[player2gamecategory] "+player2Record[player2gamecategory]);
	
	Chessgame.update({id:GameID},{Result:resultstring,TurnTakerSentence:tts,Player1ELOafter:player1Record.ELO,Player2ELOafter:player2Record.ELO,Player1CategoryELOafter:player1Record[player1gamecategory],Player2CategoryELOafter:player2Record[player2gamecategory]}).exec(function afterwards(err, updated){
	//sails.sockets.broadcast(GameID, 'ELOAdjustments',updated);
		sails.sockets.broadcast(GameID, 'chessgamemove',{room:GameID});

	Chatmessage.create({room:GameID,content:resultstring }).exec(function (err, records) {
	sails.sockets.broadcast(GameID,'message', {room:GameID,content: resultstring  });
	
	 
	});
	});
	
	
	});

	};

 
function MakeGame(p1,p2,p1color,gamecat,gametype,num1,num2)
 {
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
		
		
		
		Chessgame.create({Player1ELO:p1ELO,Player1CategoryELO:p1CategoryELO,Player2ELO:p2ELO,Player2CategoryELO:p2CategoryELO,GameCategory:gamecat,Player1TimeLimit:num1,Player1TimeLeft:num1,Player2TimeLimit:num2,Player2TimeLeft:num2,GameType:gametype,Move:1,Player1Color:p1color,Player1:p1ID,Player2:p2ID,Player1Name:p1Name,Player2Name:p2Name}).exec(
			
			function (err, records) {
				if(err){
			console.log('Cant create joined game.');
			//console.log(JSON.stringify(err));
			}
			//console.log("records"+JSON.stringify(records));
			//console.log(records);
			console.log("broadcasting to "+p1ID);
			  sails.sockets.broadcast(p1ID,'newmygameevent', records);
			 if (p1ID!=p2ID)
			{
			  sails.sockets.broadcast(p2ID,'newmygameevent', records);
			}
			
			sails.config.globals.initialTimeouts[records.id]=setTimeout(function(gamID)
			{
				console.log("inaction timeout"+gamID);
				Chessgame.findOne({id:gamID}).exec(function(
				myerr,myRecords)
				{
					//console.log("Move "+myRecords.Move);
					if (myRecords.Move==1)
					{
					Chessgame.update({id:myRecords.id},{Result:"Both Players Timed Out"},function(
					timeOuterr,timeOutRecords)
					{
					sails.sockets.broadcast(myRecords.id, 'chessgamemove',{room:myRecords.id});
	
					});
						
					}
					});
					},30000,records.id);
		
			//return res.json(records);
			
			
			});
			
			
			
			
			
			
			
			
			//game.destroy();
			}); 
	 
	}
 
// var TimerList=[];
module.exports = {
	
	Joingame: function(req,res)  {
	   var sentresponse=false;
	   
	   	Openchessgame.findOne(req.param('GameID'), function foundUser(err, game) {
	
		
			if (!game) {
			console.log('Session refers to a game that no longer exists.');
			return res.notFound();
			}	
			
			
			if (!game.Player2)
			{
			//	game.Player2=MyID;
	   MakeGame(req.param('MyID'),req.param('PlayerID'),game.Player1Color,req.param('GameCategory'),req.param('GameType'),req.param('Player1TimeLimit'),req.param('Player2TimeLimit'));
	   
		return res.ok();
			}
			else
			{
			console.log('someone already joined game.'+Game.Player2);
			if (sentresponse==false)
			{
			sentresponse=true;
			return res.forbidden();
			}	
			}
			
		
       
		 });
    
    },
    
    updateGameTime:function(req,res){
	Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cg) {
		if(cg)
		{
		if(cg.Player1==req.param('player'))
		{console.log("player1 sent game time");}
		else
		{console.log("player2 sent game time");}
		
	}
			});
	
	},

    chessgamemove:function(req,res){
	var td=0;
	console.log("req.param('GameOver')"+req.param('GameOver'));
	clearTimeout(sails.config.globals.initialTimeouts[req.param('GameID')]);
	if (req.param('GameOver')=='true')
	{
		
		
		Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cg) {
		
		var player1color=cg.Player1Color;
			var player2color;
			if (player1color=="White")
			{
			player2color="Black";	
			}
			else
			{
			player2color="White";	
			}
		
		var GameState=req.param('GameState');
		var GameDescriptor=req.param('GameDescriptor');
		if(GameState=='draw')
		{
			
			
			
			console.log("do draw");
			DoDraw(cg.Player2,cg.Player1,player2color,player1color,cg.GameCategory,cg.id,GameDescriptor);
		
			
			}
		
		if (GameState=='checkmate')
		{
			console.log("game state is check mate");
			console.log("req.param('ColorToMove') "+req.param('ColorToMove'));
			console.log("cg.Player1Color "+cg.Player1Color);
			var clrtomove;
			if (req.param('ColorToMove')=='w')
			{clrtomove='White';}
			else
			{clrtomove='Black';}
		
		
			
	if (clrtomove==cg.Player1Color)
		{
		DoGameResult(cg.Player2,cg.Player1,player2color,player1color,cg.GameCategory,cg.id,'false',2);
		}
		else
		{
		DoGameResult(cg.Player1,cg.Player2,player1color,player2color,cg.GameCategory,cg.id,'false',1);
		}
	}
	
	});
	
	}
	else
	{
	
		//console.log("ColorToMove "+req.param('ColorToMove'));
		Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cg) {
		//td=cg.TimeLimit;
		//console.log("delay is "+td);
		
		var OldMoveNumber=cg.Move;
		//console.log("old move outside of timer"+OldMoveNumber);
		if (cg.TimeOfLastMove)
		{
	//	console.log("Time diff "+(Date.now()-cg.TimeOfLastMove));
		var diff=(Date.now()-cg.TimeOfLastMove);
		diff=diff/1000;
		var clrtomove;
			if (req.param('ColorToMove')=='w')
			{clrtomove='White';}
			else
			{clrtomove='Black';}
		if (clrtomove==cg.Player1Color)
		{
		cg.Player2TimeLeft-=diff;
		}
		else
		{
		cg.Player1TimeLeft-=diff;
		}
		cg.TimeOfLastMove=Date.now();
		cg.save();
		sails.sockets.broadcast(req.param('GameID'), 'chessgamemove',{room:req.param('GameID')});
	
		}
		else
		{
		cg.GameStartTime=Date.now();
		cg.TimeOfLastMove=Date.now();
		cg.save();
		sails.sockets.broadcast(req.param('GameID'), 'chessgamemove',{room:req.param('GameID')});
	
		}
		
		/*
		for (x in TimerList)
		{
		
		if (TimerList[x].Game==req.param('GameID'))
		{
			console.log("clearing timer "+TimerList[x].Timer);
		clearInterval(TimerList[x].Timer);	
		}
		}
		
		var myint=setInterval(function(){
		sails.sockets.broadcast(req.param('GameID'), 'secondelapsed',{msg:req.param('ColorToMove')});
		if(cg.Player1Color==req.param('ColorToMove'))
		{cg.Player1TimeLimit-=1;}
		else
		{cg.Player2TimeLimit-=1;}
		cg.save();
		},1000);
		TimerObject={Game:req.param('GameID'),Timer:myint};
		TimerList.push(TimerObject);
		*/	
		var timeleft;
		var clrtomove;
			if (req.param('ColorToMove')=='w')
			{clrtomove='White';}
			else
			{clrtomove='Black';}
		if (clrtomove==cg.Player1Color)
		{
		timeleft=cg.Player1TimeLeft*1000;
		}
		else
		{
		timeleft=cg.Player2TimeLeft*1000;
		}
	
	setTimeout(		function(){
		
		Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cgame) {
		if (cgame)
		{
		//console.log("chess game turn duration"+cgame.TimeLimit);
		//console.log("chess game move in timer"+cgame.Move);
		//console.log("chess game move outside of timer "+OldMoveNumber);
		if (!cgame.Result)
		{
		if (cgame.Move==OldMoveNumber)
		{
			var clrtomove;
			if (req.param('ColorToMove')=='w')
			{clrtomove='White';}
			else
			{clrtomove='Black';}
		sails.sockets.broadcast(req.param('GameID'), 'timeoutevent',{msg:"gametimedout"});
		console.log('ColorToMove'+req.param('ColorToMove'));
		console.log("cgame.Player1Color "+cgame.Player1Color);
		
		
		var player1color=cg.Player1Color;
			var player2color;
			if (player1color=="White")
			{
			player2color="Black";	
			}
			else
			{
			player2color="White";	
			}
		
		if (clrtomove==cgame.Player1Color)
		{
		DoGameResult(cgame.Player2,cgame.Player1,player2color,player1color,cgame.GameCategory,cgame.id,'true',2);
		}
		else
		{
		DoGameResult(cgame.Player1,cgame.Player2,player1color,player2color,cgame.GameCategory,cgame.id,'true',1);
		}
		}
		}
		}
		
		});
	}
		//,td*60);
	,timeleft);
	
	});
	
	return res.ok();
	
	}
	},
	
	OfferDraw:function(req,res){
		
	sails.sockets.broadcast(req.param('gameid'), 'DrawOffered',{room:req.param('gameid'),offerer:req.param('userid'),offeredto:req.param('OfferedTo')});
	
	Chessgame.findOne({
		id:req.param('gameid')
	},function foundGame(err,gm){
		if(!err)
		{
		gm.DrawOfferedTo=req.param('OfferedTo');
		gm.save();
		}
	});
	
	User.findOne({
      id: req.param('userid')
	},function foundUser(err,user){
		if (!err){
	
	sails.sockets.broadcast(req.param('gameid'),'message', {room:req.param('gameid'),content: '<p class=\'redtext\'>'+user.name+' has offered a draw<p>' });
	}
	});
	
	},
	
deletegame:function(req,res){
	Chessgame.destroy({id:req.param('gameid')}).exec
	(function(err){
		if (err) {
  console.log(err);
		}
			sails.sockets.broadcast(req.param('owner'),'deletegameevent', {gameid:req.param('gameid')});
	console.log('deleted game owner '+req.param('owner'));
	console.log('broadcast deletegameevent'+JSON.stringify({gameid:req.param('gameid')}));

		}
	
	);
	
	}	,
	
	deleteopengame:function(req,res){
	Openchessgame.destroy({id:req.param('gameid')}).exec
	(function(err){
		if (err) {
  console.log(err);
		}
			sails.sockets.broadcast('openchessgameroom','deleteopengameevent', {gameid:req.param('gameid')});
	console.log('param '+req.param('gameid'));
	console.log('broadcast deleteopengameevent'+JSON.stringify({gameid:req.param('gameid')}));

		}
	
	);
	
	}	,
	
	
	newopengame:function(req,res){
	console.log("all params of new open game"+JSON.stringify(req.allParams()));
	Openchessgame.create(
	req.allParams()
	).exec(function (err, newgam){
  if (err) { return res.serverError(err); }

  
  sails.sockets.broadcast('openchessgameroom','newopengameevent', newgam);
  return res.json(newgam);
});
	
	
	
	},
	
	
	AcceptDraw:function(req,res){
		Chessgame.findOne({
		id:req.param('gameid')
		},function foundGame(err,gm){
	if(!err)
		{
			if (!gm.Result)
			{
				console.log("gm.Result "+gm.Result);
				console.log("gm.player1 "+gm.Player1);
				console.log("gm.player2 "+gm.Player2);
			
			var player1color=cg.Player1Color;
			var player2color;
			if (player1color=="White")
			{
			player2color="Black";	
			}
			else
			{
			player2color="White";	
			}
			
			DoDraw(gm.Player1,gm.Player2,player1color,player2color,gm.GameCategory,gm.id,'agreement');
	
			var player1color=cg.Player1Color;
			var player2color;
			if (player1color=="White")
			{
			player2color="Black";	
			}
			else
			{
			player2color="White";	
			}
			
			DoDraw(gm.Player1,gm.Player2,player1color,player2color,gm.GameCategory,gm.id,'agreement');
	
		}
		}
		});
	},
	
	Withdraw:function(req,res){
		Chessgame.findOne({
		id:req.param('gameid')
		},function foundGame(err,gm){
	if(!err)
		{
			if (!gm.Result)
			{
				console.log("gm.Result "+gm.Result);
			DoWithdraw(req.param('withdrawer'),gm.id);
		}
		}
		});
	
	}
};
