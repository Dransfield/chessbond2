/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
		GameID=req.param('GameID');
		MyID=req.param('MyID');
		
		MyName=req.param('MyName');
		GameTypeID=req.param('GameType');
		num=req.param("InfoNum");
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
			Chessgame.create({InfoNum:num,GameType:GameTypeID,Move:1,Player1:PlayerID,Player2:MyID,Player1Name:PlayerName,Player2Name:MyName}).exec(
			
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
		sails.sockets.broadcast(req.param('GameID'), 'chessgamemove',{room:req.param('GameID')});
	var td=0;
	console.log("ColorToMove "+req.param('ColorToMove'));
		Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cg) {
		td=cg.InfoNum;
		console.log("delay is "+td);
		
		var OldMoveNumber=cg.Move;
		console.log("old move outside of timer"+OldMoveNumber);
	setTimeout(		function(){
		
		Chessgame.findOne(req.param('GameID'), function foundChessgame(err, cgame) {
		if (cgame)
		{
		console.log("chess game turn duration"+cgame.InfoNum);
		console.log("chess game move in timer"+cgame.Move);
		console.log("chess game move outside of timer "+OldMoveNumber);
		if (cgame.Move==OldMoveNumber)
		{
		sails.sockets.broadcast(req.param('GameID'), 'timeoutevent',{msg:"gametimedout"});
		}
		
		}
		
		});
	}
		//,td*60);
	,(td*60)*1000);
	
	});
	return res.ok();
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
	RecordGameResult:function(req,res){
	var EloRating = require('elo-rating');
	
		//var elo = require('elo-rank')(32);
	console.log("winner "+req.param('winner'));
	console.log("loser "+req.param('loser'));
	//var expectedScoreA = elo.getExpected(playerA, playerB);
	//var expectedScoreB = elo.getExpected(playerB, playerA);
	
	User.find({
  id : [req.param('winner'), req.param('loser')]
	}).exec(function (err, winnersandlosers){
	console.log(JSON.stringify(winnersandlosers));
	
	var winnerRecord;
	var loserRecord;
	if (req.param('winner')==winnersandlosers[0].id)
	{winnerRecord=winnersandlosers[0];
		loserRecord=winnersandlosers[1];
		}
		else
		{
		winnerRecord=winnersandlosers[1];
		loserRecord=winnersandlosers[0];
		
		}
	
	console.log("loser record:"+JSON.stringify(loserRecord));
	console.log("winner record:"+JSON.stringify(winnerRecord));
	
	console.log("loser is "+loserRecord.name);
	console.log("winner is "+winnerRecord.name);
	
	
	var winnerstartELO=winnerRecord.ELO;
	var loserstartELO=loserRecord.ELO;
	
	//var expectedScoreA = elo.getExpected(winnerRecord.ELO, loserRecord.ELO);
	//var expectedScoreB = elo.getExpected(loserRecord.ELO, winnerRecord.ELO);
	var obj=EloRating.calculate(winnerRecord.ELO, loserRecord.ELO);
	winnerRecord.ELO=obj.playerRating;
	loserRecord.ELO=obj.opponentRating;
	
	//console.log("expectedScoreA is "+expectedScoreA);
	//console.log("expectedScoreB is "+expectedScoreB);
	//console.log("loser ELO was "+loserRecord.ELO);
	
	//console.log("winner ELO was "+winnerRecord.ELO);
	
//	winnerRecord.ELO = elo.updateRating(expectedScoreA, 1, winnerRecord.ELO);
	// loserRecord.ELO = elo.updateRating(expectedScoreB, 0, loserRecord.ELO);
	
	
	//console.log("loser ELO is "+loserRecord.ELO);
	
	//console.log("winner ELO is "+winnerRecord.ELO);
	
	loserRecord.save();
	winnerRecord.save();
	
	var Res1=winnerRecord.name+"'s ELO score went from "+winnerstartELO+" to "+winnerRecord.ELO;
	var Res2=loserRecord.name+"'s ELO score went from "+loserstartELO+" to "+loserRecord.ELO;
	//console.log("GameID "+req.param('GameID'));
	Chessgame.update({id:req.param('GameID')},{EloResult1:Res1,EloResult2:Res2}).exec(function afterwards(err, updated){
	sails.sockets.broadcast(req.param('GameID'), 'ELOAdjustments',updated);
	//console.log("ELO results"+JSON.stringify(updated));
	//console.log(JSON.stringify(err));
	});
	
	
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

    return res.json({
	
      message: 'Subscribed to a room called '+roomName+'!'
    });
  });
  
   
  
},
	
	loginbuttonpushed:function(req,res){
		console.log('strategy is '+req.allParams()['button']);
		//.
	req.session.strategy=req.allParams()['button'];
	
	
	return res.ok();
	},
	
	MyLogout:function(req,res){
	/*	console.log(req.session.user);
		//req.session.Loggedin='false';
		//req.session.userid='';
		// User.findOne({
      //id: req.session.user.id
	//},function foundUser(err,user){
		if (!err){
			
	Auth.findOne({
		id:user.auth
	},function foundAuth(err,auth){
		
	auth.facebookId=0;
	auth.Picture='';
	user.save();
	
	});
	}
	});
	*/
	req.session.authenticated=false;
	req.session.auth=null;
	req.session.passport=null;
	return res.redirect('/');
		
		},
	RecordSession:function(req,res){
	//	req.session.userid=req.session.user.id;
		//req.session.username=req.session.auth.name;
		res.cookie();
		return res.view('homepage');
	
  //  req.session.myusername=req.session.user.auth.name;
    
		
		
		/*
		console.log('record session');
		var object=req.session.user;
		req.session.Loggedin='true';
   console.log('here is req.session.user.auth');
	
	for (var key in req.session.user.auth) {
   console.log(' name=' + key + ' value=' + req.session.user.auth[key]);
   }	
   console.log('here is req.session.user');
	for (var key in req.session.user) {
   if(req.session.user[key]!='')
   {
   console.log(' name=' + key + ' value=' + req.session.user[key]);
	//req.session["'"+key+"'"]= req.session.user[key];
	
	Object.defineProperty(req.session, 'userASSSSSSSSSS'+key, {
  value: req.session.user[key],
  writable: true,
  enumerable: false,
  configurable: true

});
	return res.view('homepage');
	}
	else
	{
	console.log(key+' is undefined');	
	}
   }	
*/
	},
	seereq:function(req,res){
	console.log("session "+JSON.stringify(req.session));
	console.log("session id"+req.sesssionID);
	},
	Homepage:function(req,res){
	console.log("session auth? "+JSON.stringify(req.session.authenticated));
	//console.log("session name "+JSON.stringify(req.session.name));
	//console.log("session user "+JSON.stringify(req.session.user));
	//console.log("session username "+JSON.stringify(req.session.user.name));
	//console.log("session user auth name "+JSON.stringify(req.session.user.auth.name));		
	return res.view('homepage',JSON.stringify(req.session));
	}
};

