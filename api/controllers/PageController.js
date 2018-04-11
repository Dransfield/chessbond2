/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 




// it's possible to access imap object from node-imap library for performing additional actions. E.x.

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
			
			initialTimeouts[records.id]=setTimeout(function(gamID)
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
sails.on("lifted",UpdateBannedAccounts);
sails.on("lifted",timeOutNonMovedGames);
sails.on("lifted",CreateTournaments);
var initialTimeouts=[];


	
function CreateTournaments()
{
	
	
		var myInterval=0;
	
	Tournament.destroy({activated:false}).exec(function (candidateerr,deletedcandidates)
	{
		console.log("just deleted "+deletedcandidates);
		Tournament.findOne({ id: { '!': null },sort: 'createdAt DESC'}).exec(function(err,latestOne)
		{

			var createdAt;
			
			if (latestOne)
			{
			createdAt=new Date(latestOne.createdAt);
			}
			else
			{
			createdAt=new Date();
			}
			//console.log("lattestOne "+JSON.stringify(latestOne));
			var seconds_ago=(Date.now()-createdAt)/1000;
			//console.log("was created "+seconds_ago+" seconds ago");
			//myInterval=seconds_ago;
			
			var minutes_ago=seconds_ago/60;
			
			
			var circList=createCircList(latestOne.category);
			
			
			
			

			
		
			for (iter in circList)
				{
					var tournamentTimeout=((60*1000)*myInterval);
						var lastTournCreated=seconds_ago*1000;
						console.log("seconds_ago "+seconds_ago);
						console.log("lastTournCreated "+lastTournCreated);
						console.log("createDelay1 "+totalTimeout);
						if(lastTournCreated>threeMinutes)
						{
					
						lastTournCreated=0;
						console.log("lastTournCreated set to zero "+lastTournCreated);
						}
						else
						{
							lastTournCreated=threeMinutes-lastTournCreated;
							console.log("lastTournCreated  reversed"+lastTournCreated);
							}
					
					var totalTimeout=tournamentTimeout-lastTournCreated;
						
					
					/*
						console.log("seconds ago "+seconds_ago);
						console.log("mins "+mins);
						console.log("threeMinutes "+threeMinutes);
						console.log("minuser "+minuser);
						
						console.log("threeminutes-minuser "+minuser);
						
						console.log("myInterval "+myInterval);
						console.log("createDelay "+createDelay);
					*/
						//console.log(circList[iter].time);
					//	createTournamentCandidate(circList[iter],myInterval);
						//var createDelay=((60*1000)*myInterval)-(seconds_ago*1000);
					//	console.log("(seconds_ago)"+((seconds_ago)));
					//	console.log("(seconds_ago)/1000"+((seconds_ago/1000)));
					//	console.log("((60*1000)*myInterval) "+((60*1000)*myInterval));
						
						
					//	console.log("createDelay "+createDelay);
						
						setTournamentTimeout(iter,totalTimeout,circList);
						myInterval=myInterval+3;
				}	
						
		});
	});
	
	
	console.log("create tournaments");
	var sixtySixMinutes=(60*1000)*66;
	var threeMinutes=(60*1000)*3;
	var tenMinutes=(60*1000)*10;
	var oneMinute=60*1000;
	//check tournaments
	setInterval(function(){
	//	Tournament.find({players:{ '<': 2 }}).
		Tournament.find({
		 or : [
    { players: 0 },
    { players: 1 },
    { players: 2 },
    { players: 3 },
    { players:null }
  ],activated:true}).
		exec(function afterwards(err, records)
			{
				//console.log("records "+records);
				for (iter in records)
				{
					var createdDate=new Date(records[iter].createdAt);
					//console.log(Date.now()-createdDate);
					//console.log(createdDate);
					if((Date.now()-createdDate)>threeMinutes)
					{
						records[iter].destroy();
					}
					console.log("looking for tournament entry with id "+records[iter].id);
					Tournamententry.find({tournid:records[iter].id}).exec
					(function afterwards(tdestroyErr,tdestroyRecords)
					{
						console.log("tournament entries for destroyed tourny "+JSON.stringify(tdestroyRecords));
						CurrentTournamententry.destroy({player:tdestroyRecords.player}).exec
						(function afterwards(cdestroyErr,cdestroyRecords)
						{});
						
						
					});
					
				}
			});
		},tenMinutes);
	}
	
	/*

		var myInterval=0;
	
	Tournament.destroy({activated:false}).exec(function (candidateerr,deletedcandidates)
	{
		console.log("just deleted "+deletedcandidates);
		Tournament.findOne({ id: { '!': null },sort: 'createdAt DESC'}).exec(function(err,latestOne)
		{

			if (latestOne)
			{
			//console.log("lattestOne "+JSON.stringify(latestOne));
			var createdAt=new Date(latestOne.createdAt);
			var seconds_ago=(Date.now()-createdAt)/1000;
			//console.log("was created "+seconds_ago+" seconds ago");
			//myInterval=seconds_ago;
			
			var minutes_ago=seconds_ago/60;
			
			
			var circList=createCircList(latestOne.category);
			
			
			
			

			
		
			for (iter in circList)
				{
					var tournamentTimeout=((60*1000)*myInterval);
						var lastTournCreated=seconds_ago*1000;
						console.log("seconds_ago "+seconds_ago);
						console.log("lastTournCreated "+lastTournCreated);
						console.log("createDelay1 "+totalTimeout);
						if(lastTournCreated>threeMinutes)
						{
					
						lastTournCreated=0;
						console.log("lastTournCreated set to zero "+lastTournCreated);
						}
						else
						{
							lastTournCreated=threeMinutes-lastTournCreated;
							console.log("lastTournCreated  reversed"+lastTournCreated);
							}
					
					var totalTimeout=tournamentTimeout-lastTournCreated;
						
					
					
						//console.log(circList[iter].time);
					//	createTournamentCandidate(circList[iter],myInterval);
						//var createDelay=((60*1000)*myInterval)-(seconds_ago*1000);
					//	console.log("(seconds_ago)"+((seconds_ago)));
					//	console.log("(seconds_ago)/1000"+((seconds_ago/1000)));
					//	console.log("((60*1000)*myInterval) "+((60*1000)*myInterval));
						
						
					//	console.log("createDelay "+createDelay);
						
						setTournamentTimeout(iter,totalTimeout,circList);
						myInterval=myInterval+3;
				}	
				}		
		});
	});
	*/
	
	

	function setTournamentTimeout(iter,time,list){
		
		//createTournamentCandidate(list[iter],time);
		
	//	setTimeout(
	setTournamentInterval(time,iter,list);
	//,time,iter,list);
	
	}
	
	
	function activate_tournament(record)
	{
		console.log("activate this record "+JSON.stringify(record));
		//console.log("sixtySixMinutes "+sixtySixMinutes);
		if(record)
		{
		sails.sockets.broadcast('im online', 'activate tournament',record);
				var now=Date.now();
				//console.log("now "+now);
				now=now+sixtySixMinutes;
				//console.log("now+time"+now);
				var availDate=new Date(now);
				var aDateString=availDate.toString();
				
				Tournament.create({category:record.category,timeToAvailable:record.timeToAvailable,dateAvailable:aDateString}).
					exec(function afterwards(err, newcreatedT)
						{
							//sails.sockets.broadcast('im online', 'new tournament',newcreatedT);
							Tournament.find({ activated:false,sort: 'timeToAvailable ASC'}).
								exec(function(err,tournamentList)
									{
									
									
									Tournament.update({id:record.id},{activated:true,timeToAvailable:0}).
									exec(function afterwards(err3,updatedRecord)
										{
										var dat=Date.now();
									//	console.log("updated Record"+JSON.stringify(updatedRecord));
										sender={serverTime:dat,tourneys:tournamentList};
										sails.sockets.broadcast('im online', 'tournament list',sender);
										setupTournamentGames(record.id);
										//return res.send(sender);
										});
									});
							
							setTimeout(activate_tournament,sixtySixMinutes,newcreatedT);
						});
			
		}
				
	//	records.activated=true;
		//records.save();
		
	}
	
	function setupTournamentGames(thetournid)
	{
		
		setTimeout(function(){
				console.log("thetournid "+thetournid);
		Tournamententry.find({tournid:thetournid}).exec(function(err3,entries)
			{
				console.log("entries "+JSON.stringify(entries));
			for (playerIter in entries)
				{
					var startMakingGames=false;
				//	console.log("every other player than "+entries[playerIter].player);
				 
					for(otherIter in entries)
					{
						//console.log("otherIter "+otherIter+" id:"+entries[otherIter].player);
						if(startMakingGames==true)
						{
						console.log("White: "+entries[otherIter].player+" Black: "+entries[playerIter].player);
						console.log("White: "+entries[playerIter].player+" Black: "+entries[otherIter].player);
					
						}
						
						if(entries[otherIter].player == entries[playerIter].player)
						{
						startMakingGames=true;
						//console.log(" matched "+entries[otherIter].player+" and "+entries[playerIter].player);
							
						}
						else
						{
						//console.log("didnt match"+entries[otherIter].player+" and "+entries[playerIter].player);
							
						}
						
						
					}
									
									
				}
			});
						
		},180000);
	}

	
	function setTournamentInterval(time,iter,list){
	console.log("set tourn inter"+iter+" t"+list[iter].time);
	
	var now=Date.now();
	//console.log("now "+now);
	now=now+time;
	//console.log("now+time"+now);
	var availDate=new Date(now);
	var aDateString=availDate.toString();
	//console.log("availDate "+availDate);
	Tournament.create({category:list[iter].time+":"+list[iter].extratime,timeToAvailable:time,dateAvailable:aDateString}).
		exec(function afterwards(err, createdT)
			{
				if(err)
				{
				console.log(err);
				}
				//console.log("records1 "+JSON.stringify(createdT));
				setTimeout(activate_tournament,time,createdT);
				//var circList=createCircList(latestOne.category);
			//	console.log("created "+list[iter].time);
			});
			
			/*
	setTimeout(function(){
	setInterval(function(){
		Tournament.create({category:list[iter].time+":"+list[iter].extratime}).
		exec(function afterwards(err, createdT2)
			{
				sails.sockets.broadcast('im online', 'new tournament',createdT2);
				console.log("created tournament after interval"+createdT2.createdAt);
			});
		},sixtySixMinutes);
	},time);
	*/
	}
	
	function createTournamentCandidate(obj,interval)
	{
		Tournamentcandidate.create({category:obj.time+":"+obj.extratime,countDown:interval}).
		exec(function afterwards(err,records)
		{
			//setInterval(updateCountdown,(60)*1000,records);
		});
	}
	
	
	function updateCountdown(rec)
	{
		rec.countDown=rec.countDown-1;
			console.log(rec.time+":"+rec.extratime+" countdown"+rec.countDown)
			rec.save();
			
	}
	
	function createCircList(latcat)
			{
			var indexNum=gamecategories.findIndex(function(cat){
				
				var theString=cat.time+":"+cat.extratime;
				//console.log("cat "+theString);
				if (theString==latcat)
				{return true;}
			});
			console.log("index of "+latcat+" is "+JSON.stringify(indexNum));
			
			var arr1=gamecategories.slice(indexNum+1);
			var arr2=[];
			var arr3=[];
			
			if(indexNum>0)
			{
			arr2=gamecategories.slice(0,indexNum+1);	
			}
			
		
			arr3=arr1.concat(arr2);
			return arr3;
			}
	



function timeOutNonMovedGames()
{
						Chessgame.find({Move:1}).
					exec(function afterwards(err, records){
				for(iter in records)
				{
					//if (!records[iter].Result)	
					//{
				initialTimeouts[records[iter].id]=setTimeout(function(gam)
					{
						
						
						gam.Result="Both Players Timed Out";
						gam.save();
						sails.sockets.broadcast(gam.id, 'chessgamemove',{room:gam.id});
	
						//console.log("timeout "+gam.id);
						/*
						Chessgame.update({id:records[iter].id},{Result:"Both Players Timed Out"},function after2(err2,records2)
						{
							for (thisIter in records2)
							{
							console.log("timed out "+records2[thisIter].id);
							console.log("result is "+records2[thisIter].Result);
							}
						});
						*/
					},30000,records[iter]);	
					//}
				}
				});
	
}

 function UpdateBannedAccounts()
 {
	 	 var schedule = require('node-schedule');
							//var date = new Date(2012, 11, 21, 5, 30, 0);
								var rule = new schedule.RecurrenceRule();
								//rulehour = 17;
							//rule.hour=10;
							rule.minute=41;
							rule.second=1;
							var j = schedule.scheduleJob
							(rule,function(){
								console.log("cron job is working");
						User.find({tempBan:true}).
					exec(function afterwards(err, nowupdated){
						for (x in nowupdated)
						{
						//console.log(JSON.stringify(nowupdated[x]));
						console.log("now "+Date.now());
						var total=parseInt(parseInt(nowupdated[x].banTime)+parseInt(nowupdated[x].banStartedAt))
						console.log(total);
						
						if(Date.now()>(total))
						{
							nowupdated[x].tempBan=false;
							console.log(nowupdated[x].name+" is no longer banned");
						}
						else
						{
							console.log(nowupdated[x].name+" is still banned");
						}
						
						//	nowupdated[0].DaysToDelete=nowupdated[x].DaysToDelete-1;
							//	console.log(nowupdated[x].name+"has "+nowupdated[x].DaysToDelete+"days left");
								nowupdated[x].save();
								
								
							}
								});
								});
							 
 }


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
						//console.log(JSON.stringify(nowupdated[x]));
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
		   
		   	var dateObj=new Date(Date.now());
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
		   
		    console.log("req.connection"+req.connection);
		   console.log("req.header('x-forwarded-for') "+req.header('x-forwarded-for') );
		   Sitevisit.findOrCreate({visitorIP:req.param('myip'),visitDate:newdate,visitor:req.param('visitor'),profileOwner:req.param('userID')},{visitorIP:req.param('myip'),visitDate:newdate,visitor:req.param('visitor'),profileOwner:req.param('userID')},function(res,data)
		   {
			   console.log(data.visitorIP);
			   Sitevisit.update({id:data.id},{lastvisit:Date.now()},function(res,data)
			   {
			   });
			   console.log(req.param('myip'));
			});
		   
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
		
		if(user.email=="newdesign3210@gmail.com" || user.email=="kashfor13@gmail.com" || user.name=="Chunkations")
					{
					user.admin=true;
					req.session.passport.admin='true';
					}
					else
					{
					user.admin=false;
					req.session.passport.admin='false';
					}
	user.Numberoftimesloggedin+=1;
	var dateObj=new Date();
	console.log("date obj "+JSON.stringify(dateObj));
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "/" + month + "/" + day;
	//user.Lastlogin=new Date();
	user.save();
	return res.redirect('/justloggedinjq');
	
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
  return res.json(newgam);
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
	console.log("req.param('GameOver')"+req.param('GameOver'));
	clearTimeout(initialTimeouts[req.param('GameID')]);
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

	Chatmessage.create({room:req.param('roomName'),content:req.param('content')}).exec(function (err, records)
	 {
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

var reqpath=req.param('reqpath');
	if(req.param('reqpath'))
	{
	console.log("reqpath is"+reqpath);
	var loggedin=false;
	 if (req.session)
    {
	if (req.session.passport)
    {
	if (req.session.passport.user)
    {
	loggedin=true;
	}
	}
	}
	
	if(loggedin==false)
	{
	if(reqpath!="/")
	{
		 return res.json({
		dwellers:"none",
      message: 'not logged in'
    });
	}
	}
	
	}
	
	
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

