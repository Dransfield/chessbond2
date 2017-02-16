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
 
	function DoDraw(player1,player2,GameID,GameDescriptor)
	{
		//console.log("player1 "+player1);
		//console.log("player2 "+player2);
		var elo = require('elo-rank')(15);
		User.find({
  id : [player1,player2]
	}).exec(function (err, players){
		
		//console.log("players[0].id "+players[0].id);
		//console.log("players[1].id "+players[1].id);
		
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
	var expectedScoreA = elo.getExpected(player1Record.ELO, player2Record.ELO);
	var expectedScoreB = elo.getExpected(player2Record.ELO, player1Record.ELO);
	if (player1!=player2)
	{
	
	player1Record.ELO = elo.updateRating(expectedScoreA, 0.5, player1Record.ELO);
	player2Record.ELO = elo.updateRating(expectedScoreB, 0.5, player2Record.ELO);
	
	player1Record.save();
	player2Record.save();
	}
	//var Res1=winnerRecord.name+"'s ELO score went from "+winnerstartELO+" to "+winnerRecord.ELO;
	//var Res2=loserRecord.name+"'s ELO score went from "+loserstartELO+" to "+loserRecord.ELO;
	var player1eloSentence="";
	if(player1Record.ELO>player1startELO)
	{player1eloSentence="+"+(player1Record.ELO-player1startELO);}
	else
	{player1eloSentence=(player1Record.ELO-player1startELO);}
	
	var player2eloSentence="";
	if(player2Record.ELO>player2startELO)
	{player2eloSentence="+"+(player2Record.ELO-player2startELO);}
	else
	{player2eloSentence=(player2Record.ELO-player2startELO);}
	
	var resultstring="";
	
	resultstring+="<span class='redtext'>"+player1Record.name+"</span> Drew by <span class='redtext'>"+GameDescriptor+"</span><span> against </span><span class='redtext'>"+player2Record.name+"</span><br><span>Result:</span><span class='redtext'>Draw</span><br>";
	
	
	resultstring+="<span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+player1Record.name+"</span><span>:</span> <span class='redtext'>"+player1Record.ELO+" ("+player1eloSentence+")</span>";
	resultstring+="<br><span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+player2Record.name+"</span><span>:</span> <span class='redtext'>"+player2Record.ELO+" ("+player2eloSentence+")</span>";
	var tts="Status:<span class='redtext'>Game over</span>";
	
	
	
	
	

	Chessgame.update({id:GameID},{Result:resultstring,TurnTakerSentence:tts}).exec(function afterwards(err, updated){
	//sails.sockets.broadcast(GameID, 'ELOAdjustments',updated);
		sails.sockets.broadcast(GameID, 'chessgamemove',{room:GameID});

	Chatmessage.create({room:GameID,content:resultstring }).exec(function (err, records) {
	sails.sockets.broadcast(GameID,'message', {room:GameID,content: resultstring  });
	
	 
	});
	});
	
	
	});
	
	}
	
	function DoGameResult(winner,loser,GameID,timeout)
	{
	var elo = require('elo-rank')(15);
	console.log("winner "+winner);
	console.log("loser "+loser);
	
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
	var expectedScoreA = elo.getExpected(winnerRecord.ELO, loserRecord.ELO);
	var expectedScoreB = elo.getExpected(loserRecord.ELO, winnerRecord.ELO);
	if (winner!=loser)
	{
	
	winnerRecord.ELO = elo.updateRating(expectedScoreA, 1, winnerRecord.ELO);
	loserRecord.ELO = elo.updateRating(expectedScoreB, 0, loserRecord.ELO);
	
	loserRecord.save();
	winnerRecord.save();
	}
	//var Res1=winnerRecord.name+"'s ELO score went from "+winnerstartELO+" to "+winnerRecord.ELO;
	//var Res2=loserRecord.name+"'s ELO score went from "+loserstartELO+" to "+loserRecord.ELO;
	var WinnereloSentence="";
	if(winnerRecord.ELO>winnerstartELO)
	{WinnereloSentence="+"+(winnerRecord.ELO-winnerstartELO);}
	else
	{WinnereloSentence=(winnerRecord.ELO-winnerstartELO);}
	
	var LosereloSentence="";
	if(loserRecord.ELO>loserstartELO)
	{LosereloSentence="+"+(loserRecord.ELO-loserstartELO);}
	else
	{LosereloSentence=(loserRecord.ELO-loserstartELO);}
	
	var resultstring="";
	
		if (timeout=='false')
	{resultstring+="<span class='redtext'>"+winnerRecord.name+"</span> Won by<span class='redtext'> checkmate</span><span> against </span><span class='redtext'>"+loserRecord.name+"</span><br><span>Result:</span><span class='redtext'>Checkmate</span><br>";}
	else
	{resultstring+="<span class='redtext'>"+winnerRecord.name+"</span> Won by<span class='redtext'> timeout</span><span> against </span><span class='redtext'>"+loserRecord.name+"</span><br><span>Result:</span><span class='redtext'>Timeout</span><br>";}
	
	
	resultstring+="<span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+winnerRecord.name+"</span><span>:</span> <span class='redtext'>"+winnerRecord.ELO+" ("+WinnereloSentence+")</span>";
	resultstring+="<br><span>New</span> <span class='redtext'>ELO ratings </span><span>of</span><span class='redtext'> "+loserRecord.name+"</span><span>:</span> <span class='redtext'>"+loserRecord.ELO+" ("+LosereloSentence+")</span>";
	var tts="Status:<span class='redtext'>Game over</span>";
	
	
	
	
	

	Chessgame.update({id:GameID},{Result:resultstring,TurnTakerSentence:tts}).exec(function afterwards(err, updated){
	//sails.sockets.broadcast(GameID, 'ELOAdjustments',updated);
		sails.sockets.broadcast(GameID, 'chessgamemove',{room:GameID});

	Chatmessage.create({room:GameID,content:resultstring }).exec(function (err, records) {
	sails.sockets.broadcast(GameID,'message', {room:GameID,content: resultstring  });
	
	 
	});
	});
	
	
	});

	};


	 sails.on("lifted", deleteAllSubs);
 
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
	
	JustLoggedIn:function(req,res){
	    User.findOne({
      id: req.session.passport.user
	},function foundUser(err,user){
		if (!err){
		
	
	user.Numberoftimesloggedin+=1;
	var dat=Date.now();
	user.Lastlogin=dat.getYear()+dat.getMonth()+dat.getDay();
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
			
			DoDraw(gm.Player1,gm.Player2,gm.id,"agreement");
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
	console.log("all params of new open game"+req.allParams());
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
		User.findOne(req.param('MyID'), function foundUser(err, user) {
		if (err) return res.negotiate(err);
		
		// If session refers to a user who no longer exists, still allow logout.
			if (!user) {
			console.log('Session refers to a user who no longer exists.');
			sentresponse=true;
			return res.notFound();
			}
		PlayerName=req.param('PlayerName');
		PlayerID=req.param('PlayerID');
		PlayerColor=req.param('PlayerColor');
		GameID=req.param('GameID');
		MyID=req.param('MyID');
		
		MyName=req.param('MyName');
		GameTypeID=req.param('GameType');
		num1=req.param("Player1TimeLimit");
		num2=req.param("Player2TimeLimit");
		
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
			Chessgame.create({Player1TimeLimit:num1,Player1TimeLeft:num1,Player2TimeLimit:num2,Player2TimeLeft:num1,GameType:GameTypeID,Move:1,Player1Color:PlayerColor,Player1:PlayerID,Player2:MyID,Player1Name:PlayerName,Player2Name:MyName}).exec(
			
			function (err, records) {
				if(err){
			console.log('Cant create joined game.');
			//console.log(JSON.stringify(err));
			}
			console.log("records");
			//console.log(records);
			  sails.sockets.broadcast(PlayerID,'newmygameevent', records);
			  if (PlayerID!=MyID)
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
			
			});
			
			//game.destroy();
		// Wipe out the session (log out)
		
		
		sails.log.verbose('joining.'+GameID+' with '+PlayerID);
       
       
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
		
		var GameState=req.param('GameState');
		var GameDescriptor=req.param('GameDescriptor');
		if(GameState=='draw')
		{DoDraw(cg.Player2,cg.Player1,cg.id,GameDescriptor);}
		
		if (GameState=='checkmate')
		{
			var clrtomove;
			if (req.param('ColorToMove')=='w')
			{clrtomove='White';}
			else
			{clrtomove='Black';}
	if (clrtomove==cg.Player1Color)
		{
		DoGameResult(cg.Player2,cg.Player1,cg.id,'false');
		}
		else
		{
		DoGameResult(cg.Player1,cg.Player2,cg.id,'false');
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
		if (clrtomove==cgame.Player1Color)
		{
		DoGameResult(cgame.Player2,cgame.Player1,cgame.id,'true');
		}
		else
		{
		DoGameResult(cgame.Player1,cgame.Player2,cgame.id,'true');
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
	
	
	subscribeToRoom: function(req, res) {
		if (!req.isSocket) {
		return res.badRequest();}
 

		
  var roomName = req.param('roomName');
 
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
			
			sails.sockets.broadcast(roomName,"joined room",{joiner:req.session.passport.user});
	
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

