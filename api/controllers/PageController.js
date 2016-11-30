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
			sails.sockets.broadcast({id:req.param('owner')},'deletegameevent', {gameid:req.param('gameid')});
	console.log('param '+req.param('gameid'));
	console.log('broadcast deleteopengameevent'+JSON.stringify({gameid:req.param('gameid')}));

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
	console.log("all params of new game"+req.allParams());
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
      id: req.session.user.id
	},function foundUser(err,user){
		if (!err){
			req.session.user.GameID=req.param('GameID');
	user.GameID=req.param('GameID');
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
			sails.log.verbose('Session refers to a user who no longer exists.');
			sentresponse=true;
			return res.backToHomePage();
			}
		PlayerName=req.param('PlayerName');
		PlayerID=req.param('PlayerID');
		GameID=req.param('GameID');
		MyID=req.param('MyID');
		MyName=req.param('MyName');
		Openchessgame.findOne(GameID, function foundUser(err, game) {
		if (err) 
		{
		if (sentresponse==false)
		{
		sentresponse=true;
		
			return res.negotiate(err);
		}
		}
		// If session refers to a user who no longer exists, still allow logout.
			
			if (!game) {
			console.log('Session refers to a game that no longer exists.');
		if (sentresponse==false)
		{
		sentresponse=true;
		
			return res.backToHomePage();
		}	
			}
			
			if (!game.Player2)
			{
				game.Player2=MyID;
			Chessgame.create({Player1:PlayerID,Player2:MyID,Player1Name:PlayerName,Player2Name:MyName}).exec(
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
			sentrespone=true;
			
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
		User.findOne(req.session.user.id, function foundUser(err, user) {
		if (err) return res.negotiate(err);

		// If session refers to a user who no longer exists, still allow logout.
			if (!user) {
			sails.log.verbose('Session refers to a user who no longer exists.');
			return res.backToHomePage();
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
    chessgamemove:function(req,res){
		sails.sockets.broadcast(req.param('GameID'), 'chessgamemove',{room:req.param('GameID')});

	return res.ok();
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
		
		req.session.Loggedin='false';
		req.session.userid='';
		return res.view('homepage');
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

