/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 


// it's possible to access imap object from node-imap library for performing additional actions. E.x.

 

 
	




	
	

sails.on("lifted", deleteAllSubs);
sails.on("lifted",UpdateAccountsMarkedForDeletion);
sails.on("lifted",UpdateBannedAccounts);
sails.on("lifted",timeOutNonMovedGames);
sails.on("lifted",CreateTournaments);




	
function CreateTournaments()
{
	
	
		var myInterval=0;
		Tournament.update({activated:true,result:""},{result:"Cancelled due to server restart"}).exec(function(uperr,uprec)
		{
	
			Tournament.destroy({activated:false}).exec(function (candidateerr,deletedcandidates)
			{
			console.log("just deleted "+deletedcandidates);
		/*
		Tournament.findOne({ id: { '!': null },sort: 'createdAt DESC'}).exec(function(err,latestOne)
		{
			Tournament.update({id:latestOne.id},{result:""}).exec(function(latesterr,updated)
			{
			var createdAt;
			
			if (updated)
			{
			createdAt=new Date(updated.createdAt);
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
			*/
		/*	
			var  theCategory;
			
			if(updated)
			{
				theCategory=updated.category;
			}
			else
			{
				theCategory=sails.config.globals.gamecategories[0].time+":"+sails.config.globals.gamecategories[0].extratime;
				console.log(theCategory);
			}
			*/
			//var circList=createCircList(theCategory);
			
			
			
			//for (iter in circList)
			for (iter in sails.config.globals.gamecategories)
				{
					var tournamentTimeout=(sails.config.globals.oneMinute*myInterval);
						//var lastTournCreated=seconds_ago*1000;
						/*
						console.log("seconds_ago "+seconds_ago);
						console.log("lastTournCreated "+lastTournCreated);
						console.log("createDelay1 "+totalTimeout);
						if(lastTournCreated>sails.config.globals.threeMinutes)
						{
						lastTournCreated=0;
						console.log("lastTournCreated set to zero "+lastTournCreated);
						}
						else
						{
						lastTournCreated=sails.config.globals.threeMinutes-lastTournCreated;
						console.log("lastTournCreated  reversed"+lastTournCreated);
						}
					
					var totalTimeout=tournamentTimeout-lastTournCreated;
						
					*/
					
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
						
						setTournamentTimeout(iter,tournamentTimeout,sails.config.globals.gamecategories);
						myInterval=myInterval+3;
				}	
						
		//});
	//});
	
		});
	});
	//console.log("create tournaments");
	
	/*CurrentTournamententry.destroy({}).exec
						(function afterwards(cdestroyErr,cdestroyRecords)
						{
							
							
							});
	*/
	//Tournamententry.destroy({}).exec
		//				(function afterwards(cdestroyErr,cdestroyRecords)
			//			{
							
							
				//			});
	//check tournaments
	
	
	//********************
	//set currently playing with result to not currently playing
	//**********************
	function setCurrentlyPlayingWithResultToNotCurrentlyPlaying()
	{
		Tournament.update({currentlyPlaying:true,result:{'!':""}},{currentlyPlaying:false}).exec(function(updateErr,updatedRecords)
			{
				console.log("set not currently playing "+JSON.stringify(updatedRecords));
		});
	}
	
	 setCurrentlyPlayingWithResultToNotCurrentlyPlaying();
	setInterval( setCurrentlyPlayingWithResultToNotCurrentlyPlaying
		,sails.config.globals.threeMinutes);
	
	//****************************************
	//set tournament to currently playing=true
	//****************************************
	
	
	
	//setTournamentToCurrentlyPlaying();
	//setInterval(setTournamentToCurrentlyPlaying
		//,sails.config.globals.threeMinutes);
	
	
	
	
	//*********************************
	//judge currently playing tournament
	//******************************
	
	function judgeCurrentlyPlayingTournaments()
	{
		
	
		Tournament.find({currentlyPlaying:true}).
		exec
		(
		function afterwards(tournyerr,tournyRecords)
		{
			console.log("looked for tournaments currently playing");
			for (tIter in tournyRecords)
			{
			
			console.log("tournaments currently playing:"+JSON.stringify(tournyRecords[tIter]));
					var createdDate=new Date(tournyRecords[tIter].createdAt);
					console.log(Date.now()-createdDate);
			
			}
		
		}
		);
			
	}
	
	judgeCurrentlyPlayingTournaments();
	setInterval(judgeCurrentlyPlayingTournaments
		,sails.config.globals.threeMinutes);
	
	//	Tournament.find({
	
	
	//*****************************************
	//destroy tournaments with less than 2 players
	//****************************************
	setInterval(function(){
	//	Tournament.find({players:{ '<': 2 }}).
		Tournament.find({
		 or : [
    { players: 0 },
    { players: 1 },
   // { players: 2 },
    //{ players: 3 },
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
					if((Date.now()-createdDate)>sails.config.globals.threeMinutes)
					{
						records[iter].destroy();
								Tournamententry.destroy({tournid:records[iter].id}).exec
								(function afterwards(tdestroyErr,tdestroyRecords)
								{	
						
						
						
								});
			
					}
					console.log("looking for tournament entry with id "+records[iter].id);
					
					
					
				}
			});
		},sails.config.globals.tenMinutes);
		//},sails.config.globals.threeMinutes);
		
		
	}
	
	/*

		
	
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
	
	
	function assignTournamentPlayersToGames(tournid)
	{
		var freePlayers=[];
		console.log("assign tournid "+tournid);
		
		Chessgame.find({tournament:tournid,Result:""}).exec(function(availErr,availableGames)
			{
				
				if(availableGames.length==0)
				{
					Tournamententry.destroy({tournid:tournid}).exec
						(function afterwards(doneErr,doneRecords)
						{
							
						Chessgame.find({tournament:tournid}).exec(function(finishedErr,finishedGames)
							{	
							
							var winners={};
							var countWinner=[];
							var highestNumber=0;
							var winnersString="Winners: ";
							for (gameIter in finishedGames)
							{
							winners[finishedGames[gameIter].Player1]={name:finishedGames[gameIter].Player1Name,acct:finishedGames[gameIter].Player1,won:0};
							//console.log(JSON.stringify(winners[finishedGames[gameIter]]));
							winners[finishedGames[gameIter].Player2]={name:finishedGames[gameIter].Player2Name,acct:finishedGames[gameIter].Player2,won:0};
							}
							
							for (gameIter in finishedGames)
							{
								
								if (sails.config.globals.gameIsAWin(finishedGames[gameIter].Player1Name,finishedGames[gameIter]))
								{
								winners[finishedGames[gameIter].Player1].won=winners[finishedGames[gameIter].Player1].won+1;	
								}
								if (sails.config.globals.gameIsAWin(finishedGames[gameIter].Player2Name,finishedGames[gameIter]))
								{
								winners[finishedGames[gameIter].Player2].won=winners[finishedGames[gameIter].Player2].won+1;	
								}
								
							}
							
							for(winnerIter in winners)
							{
								console.log(winnerIter);
								if (winners[winnerIter].won>highestNumber)
								{
								highestNumber=winners[winnerIter].won;
								}
							}
							
							if (highestNumber>0)
							{
							for(winnerIter in winners)
							{
								if (winners[winnerIter].won==highestNumber)
								{
									winnersString=winnersString.concat(" "+winners[winnerIter].name);
								}
							}
							}
							else
							{
								winnersString=winnersString.concat("none");
							}
							
							Tournament.update({id:tournid},{result:winnersString}).exec(function(){
							
							});
							
							});
							});
				}
				
			if (availableGames.length>0)
			{
				Chessgame.find({tournament:tournid}).exec(function(allGameErr,allgames)
				{
					for (allIter in allgames)
					{
					freePlayers[allgames[allIter].Player1]=allgames[allIter].Player1;				
					freePlayers[allgames[allIter].Player2]=allgames[allIter].Player2;				
					}
		
			
		
				Chessgame.find({tournament:tournid,started:true,Result:""}).exec(function(narrowErr,narrow)
				{
		
					for (narrowIter in narrow)
					{
					console.log(narrow[narrowIter].Player1+" not free");
					console.log(narrow[narrowIter].Player2+" not free");
					console.log("because of game "+narrow[narrowIter].id);
					freePlayers[narrow[narrowIter].Player1]="";				
					freePlayers[narrow[narrowIter].Player2]="";				
					}
		
					Chessgame.find({tournament:tournid,started:false,Result:""}).exec(function(gameErr,opengames)
					{
						
						
						
						for (openIter in opengames)
						{
							
							var player1=opengames[openIter].Player1;
							var player2=opengames[openIter].Player2;
						
								if (freePlayers[player1]==player1)
								{
									if (freePlayers[player2]==player2)
									{
									console.log("activating "+opengames[openIter].id);
									activateTournamentGame(player1,player2,opengames[openIter].id);
									freePlayers[player1]="";
									freePlayers[player2]="";
									}
								}
							
							
						}
					});
		
		
				});
		});
	}
	});
	}
			function setTournamentToCurrentlyPlaying(record)
	{
		//console.log("set tournament to currently playing?"+JSON.stringify(record));
		
		Tournament.find({currentlyPlaying:false,result:"",id:record.id,players:{'>':1}}).exec(function(updateErr,tournyRecords)
			{
				if(tournyRecords)
				{
				if(tournyRecords.length>0)
				{
					console.log("tournyRecords "+JSON.stringify(tournyRecords[0]));
					Tournament.update({id:tournyRecords[0].id},{currentlyPlaying:true}).exec(function(updateErr2,updatedRecords2)
					{
					console.log("set tournament to currently playing2 "+JSON.stringify(updatedRecords2));
	
					console.log("this tournament is now currently playing "+updatedRecords2[0].id);	
					setupTournamentGames(updatedRecords2[0]);
					
					
					
					});
				}
				}
			});
			
		/*Tournament.find({currentlyPlaying:false,result:"",players:{'>':1}}).exec(function(updateErr,tournyRecords)
			{
				if(tournyRecords)
				{
				console.log("this tournament is now currently playing "+JSON.stringify(tournyRecords));	
					for (tIter in tournyRecords)
					{
					var thisTourn=tournyRecords[tIter];
					
					setTimeout(function(){
					
					Tournament.update({id:thisTourn.id},{currentlyPlaying:true}).exec(function(updateErr2,updatedRecords2)
					{
					console.log("this tournament is now currently playing "+updatedRecords2[0].id);	
					setupTournamentGames(thisTourn.id);
					});
						},(sails.config.globals.threeMinutes)-1000);
					
					
						}
				}
		
			});
			*/
		/*
		Tournament.find({players:{ '>': 1 },result:""}).
		exec
		(
		function afterwards(tournyerr,tournyRecords)
		{
			console.log("looked for tournaments with more than 1 entrant and no result");
			for (tIter in tournyRecords)
			{
			
			console.log("tournaments with more than 1 entrant:"+JSON.stringify(tournyRecords[tIter]));
			
			if(!tournyRecords[tIter].currentlyPlaying)
			{
			var thisTourn=tournyRecords[tIter];
				setTimeout(function(){
			
			Tournament.update({id:thisTourn.id},{currentlyPlaying:true}).exec(function(updateErr,updatedRecords)
			{
			console.log("this tournament is now currently playing "+updatedRecords[0].id);	
			});
				},sails.config.globals.threeMinutes);
				
			}
			
			}
		
		}
		*/
		
		
		
	}
	
	function activate_tournament(record)
	{
		console.log("activate this record "+JSON.stringify(record));
		console.log("sixtySixMinutes "+sails.config.globals.sixtySixMinutes);
		if(record)
		{
		sails.sockets.broadcast('im online', 'activate tournament',record);
				var now=Date.now();
				//console.log("now "+now);
				now=now+sails.config.globals.sixtySixMinutes;
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
										
										setTimeout(setTournamentToCurrentlyPlaying,sails.config.globals.threeMinutes,updatedRecord[0]);
										
										//return res.send(sender);
										});
									});
							
							setTimeout(activate_tournament,sails.config.globals.sixtySixMinutes,newcreatedT);
						});
			
		}
				
	//	records.activated=true;
		//records.save();
		
	}
	
	function setupTournamentGames(thetourn)
	{
		//console.log("setupTournamentGames");
	//	setTimeout(function(){
		//		console.log("thetournid "+thetournid);
		
		
		Tournamententry.find({tournid:thetourn.id}).exec(function(err3,entries)
			{
				
				
				
				
				
				
				
				console.log("entries "+JSON.stringify(entries));
				
				var promiseArray=[];
				
			for (playerIter in entries)
				{
					
					var startMakingGames=false;
				//	console.log("every other player than "+entries[playerIter].player);
				 
					for(otherIter in entries)
					{
						//console.log("otherIter "+otherIter+" id:"+entries[otherIter].player);
						if (entries[playerIter].id!=entries[otherIter].id)
						{
						//if(startMakingGames==true)
						//{
						var p1=entries[otherIter].player;
						var p2=entries[playerIter].player;
						
						//console.log("White: "+p1+" Black: "+p2);
						//console.log("White: "+p2+" Black: "+p1);
						var num1=thetourn.category.split(":")[0];
						var num2=thetourn.category.split(":")[1];
						num1=num1*60;
						num2=num2*60;
						
						promiseArray.push(MakeChessGameForTournament(p1,p2,"White",thetourn.category,"timed",num1,num2,thetourn));
						promiseArray.push(MakeChessGameForTournament(p2,p1,"White",thetourn.category,"timed",num1,num2,thetourn));
						
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
				
				Promise.all(promiseArray).then(values => 
				{ 
					/*
					console.log("made all tournament games"+JSON.stringify(values));
					console.log("entries.length "+entries.length);
					var activate=true;
					
						for (playerIter=0;playerIter<entries.length;playerIter++)
						{
							if(activate==true)
							{
								var nextOne=playerIter+1;
								if ((nextOne)<entries.length)
								{
									console.log("playeriter"+playerIter);
									activateTournamentGame(entries[playerIter].player,entries[nextOne].player,thetourn.id);
									activate=false;
								}
							}
							else
							{activate=true;}
						}
					*/
					assignTournamentPlayersToGames(thetourn.id);
				});
						
		//},sails.config.globals.threeMinutes);
	});
	}
	
	function activateTournamentGame(player1,player2,thegame)
	{
		//console.log(entry1.player);
		//console.log(entry2.player);
		Chessgame.update({id:thegame},{started:true}).exec(
		function(err3,records)
		{
			
			if (err3)
			{console.log(err3);}
			else
			{
			
			var theGame=records;
			console.log("theGame "+JSON.stringify(theGame));
			/*
			
			var promiseArray=[];
			promiseArray.push(retrieveSubPromise(entry1.player));
			promiseArray.push(retrieveSubPromise(entry2.player));
			
			Promise.all(promiseArray).then(values => 
				{ 
				console.log(values);
				
				if(values[0] && values[1])
				{
				if(values[0].subscriber &&  values[1].subscriber)
				{ 
				*/
				sails.sockets.broadcast(theGame[0].Player1,'newmygameevent', theGame[0]);
				sails.sockets.broadcast(theGame[0].Player2,'newmygameevent', theGame[0]);
				/*
				}
				}
				
				});
				*/
				
				
				sails.config.globals.initialTimeouts[theGame[0].id]=setTimeout(function(gamID)
			{
				console.log("inaction timeout"+gamID);
				Chessgame.findOne({id:gamID}).exec(function(
				myerr,myRecords)
				{
					//console.log("Move "+myRecords.Move);
					if (myRecords.Move==1)
					{
					
					var firstPlayer;
					if (sails.config.globals.playerIsWhite(myRecords.Player1,myRecords))
					{firstPlayer=myRecords.Player1;}
					else
					{firstPlayer=myRecords.Player2;}
					
					//User.findOne({id:firstPlayer}).exec(function(
					//userErr,theUser)
					//{
						
					if (firstPlayer==myRecords.Player1)
					{
					DoTournamentGameResult(myRecords.Player2,myRecords.Player1,'Black','White',myRecords.GameCategory,myRecords.id,'true','false',2);
					}
					else
					{
						
					DoTournamentGameResult(myRecords.Player1,myRecords.Player2,'Black','White',myRecords.GameCategory,myRecords.id,'true','false',1);
					}
					/*
					Chessgame.update({id:myRecords.id},{Result:theUser.name+" Timed Out"},function(
					timeOuterr,timeOutRecords)
					{
					//sails.sockets.broadcast(myRecords.id, 'chessgamemove',{room:myRecords.id});
	
					});
					*/
					
					//});	
						
					}
				});
					
					},30000,theGame[0].id);
				
				
			}
			
		});
	}
								
	
	function retrieveSubPromise(user,game)
	{
		
	 return new Promise((resolve,reject)=>{
	Subscription.findOne({
	subscriber : user,room:'im online'
	}).exec(function (err, records){	
	if (err)
	{reject();}
	else
	{
	resolve(records);
	}
	});
	});
}
	
	function MakeChessGameForTournament(p1,p2,p1color,gamecat,gametype,num1,num2,tourn)
 {
	 
	 
		 return new Promise((resolve,reject)=>{
	 gametype="timed";
	 console.log("MakeChessGameForTournament");
	User.find({
	id : [p1,p2]
	}).exec(function (err, players){
		
		if (err) 
		{reject();}
		
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
		
		
		
		Chessgame.create({tournamentGame:true,started:false,tournament:tourn.id,Player1ELO:p1ELO,Player1CategoryELO:p1CategoryELO,Player2ELO:p2ELO,Player2CategoryELO:p2CategoryELO,GameCategory:gamecat,Player1TimeLimit:num1,Player1TimeLeft:num1,Player1ExtraTimeLeft:num2,Player2TimeLimit:num1,Player2TimeLeft:num1,Player2ExtraTimeLeft:num2,GameType:gametype,Move:1,Player1Color:p1color,Player1:p1ID,Player2:p2ID,Player1Name:p1Name,Player2Name:p2Name}).exec(
			
			function (err, records) {
				if(err){
			console.log('Cant create joined game.');
			//console.log(JSON.stringify(err));
			reject();
			}
			else
			{resolve(records);}
			//console.log("records"+JSON.stringify(records));
			//console.log(records);
			//console.log("broadcasting to "+p1ID);
			 
			 // sails.sockets.broadcast(p1ID,'newmygameevent', records);
			 //if (p1ID!=p2ID)
			//{
			 // sails.sockets.broadcast(p2ID,'newmygameevent', records);
			//}
			/*
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
					//sails.sockets.broadcast(myRecords.id, 'chessgamemove',{room:myRecords.id});
	
					});
						
					}
					});
					},30000,records.id);
			*/
			//return res.json(records);
			
			
			});
			
			
			
			
			
			
			
			
			//game.destroy();
			}); 
	 });
	}
	
	function DoTournamentGameResult(winner,loser,winnercolor,losercolor,gamecat,GameID,timeout,resignation,winner1or2)
	{
	var EloRank = require('elo-rank');
	var elo = new EloRank(15);
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
	{

		if(resignation=='false')
		{resultstring+="<span class='redtext'>"+winnerRecord.name+"</span> Won by<span class='redtext'> checkmate</span><span> against </span><span class='redtext'>"+loserRecord.name+"</span><br><span>Result:</span><span class='redtext'>Checkmate</span><br>";}
		else
		{resultstring+="<span class='redtext'>"+winnerRecord.name+"</span> Won by<span class='redtext'> resignation</span><span> against </span><span class='redtext'>"+loserRecord.name+"</span><br><span>Result:</span><span class='redtext'>Resignation</span><br>";}
		
		
		}
	
	else
	{
		
		{resultstring+="<span class='redtext'>"+winnerRecord.name+"</span> Won by<span class='redtext'> timeout</span><span> against </span><span class='redtext'>"+loserRecord.name+"</span><br><span>Result:</span><span class='redtext'>Timeout</span><br>";}
		
		
		
		
	}
	
	
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
		sails.sockets.broadcast('/humanvshumannew/'+GameID, 'chessgamemove',{room:GameID});

	Chatmessage.create({room:GameID,content:resultstring }).exec(function (err, records) {
	sails.sockets.broadcast('/humanvshumannew/'+GameID,'message', {room:GameID,content: resultstring  });
	assignTournamentPlayersToGames(updated[0].tournament);
	 
	 
	});
	});
	
	
	});

	};
	
	function setTournamentInterval(time,iter,list){
	//console.log("set tourn inter"+iter+" t"+list[iter].time);
	
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
			var indexNum=sails.config.globals.gamecategories.findIndex(function(cat){
				
				var theString=cat.time+":"+cat.extratime;
				//console.log("cat "+theString);
				if (theString==latcat)
				{return true;}
			});
			console.log("index of "+latcat+" is "+JSON.stringify(indexNum));
			
			var arr1=sails.config.globals.gamecategories.slice(indexNum+1);
			var arr2=[];
			var arr3=[];
			
			if(indexNum>0)
			{
			arr2=sails.config.globals.gamecategories.slice(0,indexNum+1);	
			}
			
		
			arr3=arr1.concat(arr2);
			return arr3;
			}
	



function timeOutNonMovedGames()
{
						Chessgame.find({Move:1,tournamentGame:false,Result:""}).
					exec(function afterwards(err, records){
				for(iter in records)
				{
					//if (!records[iter].Result)	
					//{
				sails.config.globals.initialTimeouts[records[iter].id]=setTimeout(function(gam)
					{
						
						
						gam.Result="Both Players Timed Out";
						gam.save();
						sails.sockets.broadcast('/humanvshumannew/'+gam.id, 'chessgamemove',{room:gam.id});
	
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
				
					Chessgame.find({started:true,Move:1,tournamentGame:true,Result:""}).
					exec(function afterwards(err, records)
					{
						for(iter in records)
						{
						sails.config.globals.initialTimeouts[records[iter].id]=setTimeout(function(gam)
							{
								if (gam.Move==1)
								{
					
								var firstPlayer;
									if (sails.config.globals.playerIsWhite(gam.Player1,gam))
									{firstPlayer=gam.Player1;}
									else
									{firstPlayer=gam.Player2;}
					
						
									if (firstPlayer=gam.Player1)
									{
									DoTournamentGameResult(gam.Player2,gam.Player1,'Black','White',gam.GameCategory,gam.id,'true','false',2);
									}
									else
									{
									DoTournamentGameResult(gam.Player1,gam.Player2,'Black','White',gam.GameCategory,gam.id,'true','false',1);
									}
					
								}
						  
						
					
							},30000,records[iter]);
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
	console.log("just logged in date obj "+JSON.stringify(dateObj));
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
	

	ReturnPing:function(req,res){
	//sails.sockets.broadcast(req.param('gameid'),'ping', {room:req.param('gameid'),player:req.param('playerid') });
	//console.log("game id "+req.param('gameid'));
	//console.log("player id "+req.param('playerid'));
	
	 return res.ok();
		
	},
	
	BroadcastPing:function(req,res){
	
		sails.sockets.broadcast('/humanvshumannew/'+req.param('gameid'),'ping', {room:req.param('gameid'),player:req.param('playerid'),ping:req.param('ping')});
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
 //console.log("joining room "+roomName);

var reqpath=req.param('reqpath');
	if(req.param('reqpath'))
	{
	//console.log("reqpath is"+reqpath);
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

