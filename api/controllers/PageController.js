/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var TimerList={};

	function DoGameResult(winner,loser,GameID,timeout)
	{
	var EloRating = require('elo-rating');
	
	console.log("winner "+winner);
	console.log("loser "+loser);
			User.find({
  id : [winner, loser]
	}).exec(function (err, winnersandlosers){
	console.log(JSON.stringify(winnersandlosers));
	
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
	
	var winnerstartELO=winnerRecord.ELO;
	var loserstartELO=loserRecord.ELO;
	var obj=EloRating.calculate(winnerRecord.ELO, loserRecord.ELO);
	winnerRecord.ELO=obj.playerRating;
	loserRecord.ELO=obj.opponentRating;
	loserRecord.save();
	winnerRecord.save();
	
	var Res1=winnerRecord.name+"'s ELO score went from "+winnerstartELO+" to "+winnerRecord.ELO;
	var Res2=loserRecord.name+"'s ELO score went from "+loserstartELO+" to "+loserRecord.ELO;
	var resultstring="";
	if (timeout=='false')
	{resultstring=winnerRecord.name+" beat "+loserRecord.name;}
	else
	{resultstring=loserRecord.name+" ran out of time. "+winnerRecord.name+" wins."}
	
	Chessgame.update({id:GameID},{Result:resultstring,EloResult1:Res1,EloResult2:Res2}).exec(function afterwards(err, updated){
	//sails.sockets.broadcast(GameID, 'ELOAdjustments',updated);
		sails.sockets.broadcast(GameID, 'chessgamemove',{room:GameID});
	
	});
	
	
	});

	};

module.exports = {
	
	
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
	console.log("all params of new open game"+req.allParams());
	Openchessgame.create(
	req.allParams()
	).exec(function (err, newgam){
  if (err) { return res.serverError(err); }

  
  sails.sockets.broadcast('openchessgameroom','newopengameevent', newgam);
  return res.ok();
});
	
	
	
	},
	
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
		num=req.param("TimeLimit");
		Openchessgame.findOne(GameID, function foundUser(err, game) {
	
		// If session refers to a user who no longer exists, still allow logout.
	
		
			if (!game) {
			console.log('Session refers to a game that no longer exists.');
			return res.backToHomePage();
			}	
			
			console.log("game.Player2 "+game.Player2);
			if (!game.Player2)
			{
				game.Player2=MyID;
			Chessgame.create({TimeLimit:num,GameType:GameTypeID,Move:1,Player1Color:PlayerColor,Player1:PlayerID,Player2:MyID,Player1Name:PlayerName,Player2Name:MyName}).exec(
			
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
		   req.session.user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		   	user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		user.save(function(err, savedUser){});
		}
	
			
		if (user.DifficultyLevelBeaten<req.param('DifficultyLevelBeaten'))
		{
		user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		req.session.user.DifficultyLevelBeaten=req.param('DifficultyLevelBeaten');
		   console.log("cookie level"+user.DifficultyLevelBeaten);
		 
		user.save(function(err, savedUser){
		sails.log.verbose('saving user error.');
       
      });
      // Either send a 200 OK or redirect to the home page
		return res.ok();
		}
    
    });
    },
    
    HomepageHeartbeat:function(req,res){
		//console.log("recieved heartbeat from:"+req.param('name'));
		if (req.session.passport){
		User.findOne(req.session.passport.user, function foundUser(err, user) {
			
			sails.sockets.broadcast('openchessgameroom','userpresence', user);
		});}
	},
	

    chessgamemove:function(req,res){
	var td=0;
	console.log("req.param('incheckmate')"+req.param('incheckmate'));
	
	if (req.param('incheckmate')=='true')
	{
		
		
			Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cg) {
		
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

	});
	
	}
	else
	{
	sails.sockets.broadcast(req.param('GameID'), 'chessgamemove',{room:req.param('GameID')});
	
		console.log("ColorToMove "+req.param('ColorToMove'));
		Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cg) {
		td=cg.TimeLimit;
		console.log("delay is "+td);
		
		var OldMoveNumber=cg.Move;
		console.log("old move outside of timer"+OldMoveNumber);
		
		
		for (x in TimerList)
		{
		if (TimerObject[x].Game=req.param('GameID'))
		{
		clearInterval(TimerObject[x].Timer);	
		}
		}
		
		var myint=setInterval(function(){
		sails.sockets.broadcast(req.param('GameID'), 'secondelapsed',{msg:req.param('ColorToMove')});
		
		},1000);
		TimerObject={Game:req.param('GameID'),Timer:myint};
		
		
	/*
	setTimeout(		function(){
		
		Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cgame) {
		if (cgame)
		{
		console.log("chess game turn duration"+cgame.TimeLimit);
		console.log("chess game move in timer"+cgame.Move);
		console.log("chess game move outside of timer "+OldMoveNumber);
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
		
		});
	}
		//,td*60);
	,(td*60)*1000);
	*/
	});
	
	return res.ok();
	
	}
	},
	ReturnPing:function(req,res){
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

	Chatmessage.create({room:req.param('roomName'),talker:req.param('talker'),msg:req.param('message')}).exec(function (err, records) {
	sails.sockets.broadcast(records.room,'message', {room:records.room, talker:records.talker,greeting: records.msg });
	
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
		
	Subscription.create({subscriber:req.session.passport.user,room:roomName}).exec
		(function (err, records) {
			if (err)
			{
				console.log(JSON.stringify(err));
			}
			else
			{
			sails.sockets.broadcast(roomName,"joined room",{joiner:req.session.passport.user});
	
			}
		 return res.json({
		
      message: 'Subscribed to a room called '+roomName+'!'
    });
			});
   }}}
  });
  
   
  
}
	
	
	
	
};

