/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 




// it's possible to access imap object from node-imap library for performing additional actions. E.x.

 
 var TimerList=[];
 function DoWithdraw(withdrawer,GameID)
 {
	 var resultstring=withdrawer+" withdrew from the game";
	 Chessgame.update({id:GameID},{Result:resultstring,TurnTakerSentence:'Withdrawal'}).exec(function afterwards(err, updated){
		sails.sockets.broadcast(GameID, 'chessgamemove',{room:GameID});

	Chatmessage.create({room:GameID,content:resultstring }).exec(function (err, records) {
	sails.sockets.broadcast(GameID,'message', {room:GameID,content: resultstring  });
	
	 
	});
	});
	}
 
	

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


	 sails.on("lifted", deleteAllSubs);
sails.on("lifted",UpdateAccountsMarkedForDeletion);
 function UpdateAccountsMarkedForDeletion()
 {
	 	 var schedule = require('node-schedule');
							//var date = new Date(2012, 11, 21, 5, 30, 0);
								var rule = new schedule.RecurrenceRule();
								//rulehour = 17;
							rule.hour=10;
							rule.minute=41;
							rule.second=1;
							var j = schedule.scheduleJob
							(rule,function(){
								console.log("cron job is working");
						User.find({MarkedForDeletion:true}).
					exec(function afterwards(err, nowupdated){
						for (x in nowupdated)
						{
						console.log(JSON.stringify(nowupdated[x]));
							nowupdated[0].DaysToDelete=nowupdated[x].DaysToDelete-1;
								console.log(nowupdated[x].name+"has "+nowupdated[x].DaysToDelete+"days left");
								nowupdated[x].save();
								
								if(nowupdated[x].DaysToDelete<1)
								{
									User.destroy({id:nowupdated[x].id}).exec(function (err) {

										});
									
									}
							}
								});
								});
							 
 }

 function deleteAllSubs()
 {
	Subscription.destroy({}).exec(function callBack(err){
    if(err)
	{
    console.log(err)
	}
    }); 
	 
	}

module.exports = {
	LookedAtProfile:function(req,res){
	   if (req.param('userID'))
	   {
	    User.findOne({
      id: req.param('userID')
	},function foundUser(err,user){
		if (!err){
		if(user){
	
	if(!user.ProfileViews)
	{
	user.ProfileViews=0;}
	user.ProfileViews+=1;
	user.save();
	}
	else
	{
	console.log("user not found "+	console.log(req.param('userID')));
	}
	
	}
	});
}
   },
	JustLoggedIn:function(req,res){
	    User.findOne({
      id: req.session.passport.user
	},function foundUser(err,user){
		if (!err){
		
	
	user.Numberoftimesloggedin+=1;
	var dateObj=new Date();
	console.log(JSON.stringify(dateObj));
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "/" + month + "/" + day;
	user.Lastlogin=new Date();
	user.save();
	return res.redirect('/profile');
	
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
	
	newsession:function(req,res){
	console.log("all params of new session"+req.allParams());
	session.create(
	req.allParams()
	).exec(function (err, newgam){
  if (err) { return res.serverError(err); }

  
  sails.sockets.broadcast('sessionroom','newsessionevent', newgam);
  return res.ok();
});
	
	
	
	},
	
	newopengame:function(req,res){
	console.log("all params of new open game"+JSON.stringify(req.allParams()));
	Openchessgame.create(
	req.allParams()
	).exec(function (err, newgam){
  if (err) { return res.serverError(err); }

  
  sails.sockets.broadcast('openchessgameroom','newopengameevent', newgam);
  return res.ok();
});
	
	
	
	},
	/*
	   ChangeUsersCurrentGame: function (req,res){
	    User.findOne({
      id: req.session.passport.user
	},function foundUser(err,user){
		if (!err){
			req.session.GameID=req.param('GameID');
	user.GameID=req.param('GameID');
	user.opponent=req.param('oppo');
	user.save();
	return res.ok();
	
	}
	});
   },
   
	*/
	Joingame: function(req,res)  {
	   var sentresponse=false;
		User.find({
  id : [req.param('MyID'),req.param('PlayerID')]
	}).exec(function (err, players){
		
		if (err) return res.negotiate(err);
		
		// If session refers to a user who no longer exists, still allow logout.
			if (!players) {
			console.log('Session refers to a user who no longer exists.');
			sentresponse=true;
			return res.notFound();
			}
		
		var myRecord;
		var oppoRecord;
		
		if (players[0].id==req.param('MyID'))
		{
		myRecord=players[0];
		oppoRecord=players[1];
		}
		else
		{
		myRecord=players[1];
		oppoRecord=players[0];
		}
		if (req.param('PlayerID')==req.param('MyID'))
	{
		myRecord=players[0];
		oppoRecord=players[0];
	}
		OppoName=oppoRecord.name;
		OppoID=oppoRecord.id;
		OppoColor=req.param('PlayerColor');
		OppoELO=oppoRecord.ELO;
		ThisGameCat=req.param('GameCategory');
		
		OppoCategoryELO=oppoRecord['rating'+OppoColor+ThisGameCat];
		
		GameID=req.param('GameID');
		
		MyID=myRecord.id;
		MyELO=myRecord.ELO;
		var MyColor;
		if(OppoColor=='White')
		{MyColor='Black';}
		else
		{MyColor='White';}
		
		MyCategoryELO=myRecord['rating'+MyColor+ThisGameCat];
		MyName=myRecord.name;
		GameTypeID=req.param('GameType');
		num1=req.param("Player1TimeLimit");
		num2=req.param("Player2TimeLimit");
		
		console.log("ThisGameCat "+ThisGameCat);
		
		Openchessgame.findOne(GameID, function foundUser(err, game) {
	
		// If session refers to a user who no longer exists, still allow logout.
	
		
			if (!game) {
			console.log('Session refers to a game that no longer exists.');
			return res.notFound();
			}	
			
			console.log("game.Player2 "+game.Player2);
			if (!game.Player2)
			{
				game.Player2=MyID;
			Chessgame.create({Player1ELO:OppoELO,Player1CategoryELO:OppoCategoryELO,Player2ELO:MyELO,Player2CategoryELO:MyCategoryELO,GameCategory:ThisGameCat,Player1TimeLimit:num1,Player1TimeLeft:num1,Player2TimeLimit:num2,Player2TimeLeft:num1,GameType:GameTypeID,Move:1,Player1Color:OppoColor,Player1:OppoID,Player2:MyID,Player1Name:OppoName,Player2Name:MyName}).exec(
			
			function (err, records) {
				if(err){
			console.log('Cant create joined game.');
			//console.log(JSON.stringify(err));
			}
			console.log("records"+JSON.stringify(records));
			//console.log(records);
			console.log("broadcasting to "+OppoID);
			  sails.sockets.broadcast(OppoID,'newmygameevent', records);
			  if (OppoID!=MyID)
			{
			  sails.sockets.broadcast(MyID,'newmygameevent', records);
			}
			});
			
			
			if(sentresponse==false)
			{
			sentresponse=true;
			
			return res.ok();
			}
			
			
			
			
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
			//game.destroy();
			});
			
			
		// Wipe out the session (log out)
		
		
		sails.log.verbose('joining.'+GameID+' with '+OppoID);
       
       
      // Either send a 200 OK or redirect to the home page
		if (sentresponse==false)
		{
		sentresponse=true;
		return res.ok();
		}
		 });
    
    },

	 UpdateLevelBeaten: function(req,res)  {
		User.findOne(req.session.passport.user, function foundUser(err, user) {
		if (err) return res.negotiate(err);

		// If session refers to a user who no longer exists, still allow logout.
			if (!user) {
			sails.log.verbose('Session refers to a user who no longer exists.');
			return res.notFound();
			}
		sails.log.verbose('about to update user level.');
       if (!user.DifficultyLevelBeaten)
       {
		  //req.session.user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		   	user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		user.save(function(err, savedUser){});
		}
	
			
		if (user.DifficultyLevelBeaten<req.param('DifficultyLevelBeaten'))
		{
		user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		//req.session.user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		   //console.log("cookie level"+user.DifficultyLevelBeaten);
		 
		user.save(function(err, savedUser){
			if (err){
		sails.log.verbose('saving user error.');
       }
      });
      // Either send a 200 OK or redirect to the home page
		return res.ok();
		}
    
    });
    },
   /* 
    HomepageHeartbeat:function(req,res){
		//console.log("recieved heartbeat from:"+req.param('name'));
		if (req.session.passport){
		User.findOne(req.session.passport.user, function foundUser(err, user) {
			
			sails.sockets.broadcast('openchessgameroom','userpresence', user);
		});}
	},
	
*/
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
	//console.log("req.param('GameOver')"+req.param('GameOver'));
	
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
			
			
			
			
			DoDraw(cg.Player2,cg.Player1,player2color,player1color,cg.GameCategory,cg.id,GameDescriptor);
		
			
			}
		
		if (GameState=='checkmate')
		{
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
	ReturnPing:function(req,res){
	//sails.sockets.broadcast(req.param('gameid'),'ping', {room:req.param('gameid'),player:req.param('playerid') });
	//console.log("game id "+req.param('gameid'));
	//console.log("player id "+req.param('playerid'));
	
	 return res.ok();
		
	},
	BroadcastPing:function(req,res){
	
		sails.sockets.broadcast(req.param('gameid'),'ping', {room:req.param('gameid'),player:req.param('playerid'),ping:req.param('ping')});
	 return res.ok();
	},
	SendMail:function(req,res){
		var nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		var transporter = nodemailer.createTransport('smtps://slenkar@gmail.com:Fuckthisshit@smtp.gmail.com');
	var mailOptions = {
    from: '"Prakash" <admin@chessbond.com>', // sender address
    to: req.param('address'), // list of receivers
    subject: 'Forgotten Password', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
	
	
	},


	
    
    chatmsg:function(req,res){

	Chatmessage.create({room:req.param('roomName'),content:req.param('content')}).exec(function (err, records) {
	sails.sockets.broadcast(records.room,'message', {room:records.room,content: records.content });
	
	 return res.ok();
});
	},
	
	AnnounceIdle:function(req,res){
		//console.log(req.param('user')+" is "+req.param('idlestatus'));
	sails.sockets.broadcast('IdleNotificationRoom','IdleNotification', {user:req.param('user'),idlestatus:req.param('idlestatus') });
	
	},
	subscribeToRoom: function(req, res) {
	
	 	if (!req.isSocket) {
		return res.badRequest();}
 

		
  var roomName = req.param('roomName');
 console.log("joining room "+roomName);
  sails.sockets.join(req, roomName, function(err) {
    if (err) {
      return res.serverError(err);
    }
    if (req.session)
    {
	if (req.session.passport)
    {
	if (req.session.passport.user)
    {	
	
	Subscription.create({hi:1,socketid:sails.sockets.getId(req),subscriber:req.session.passport.user,room:roomName}).exec
		(function (err, records) {
			if (err)
			{
				console.log(JSON.stringify(err));
			}
			else
			{
			
			sails.sockets.broadcast(roomName,"joined "+roomName+" room",{joiner:req.session.passport.user});
	
			}
			
			Subscription.find({room:roomName}).exec
		(function (err, records) {
			var people=[];
			//console.log(JSON.stringify(records));
			
			for (x in records)
		 {people.push(records[x].subscriber);}
		 var names="";
		// console.log("people array"+JSON.stringify(people));
		 User.find({id:people}).exec
		(function (err, userrecords) {
			//console.log("userrecords"+JSON.stringify(userrecords));
		for (iter in userrecords)
		{
		names=names+userrecords[iter].name+","; 
		}
			 return res.json({
		dwellers:names,
      message: 'joined room'
    });
	
	 });
	});
			});
   }}}
  });
  
   
  
}
	
	
	
	
};

