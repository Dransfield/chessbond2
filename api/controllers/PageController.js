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

var initialTimeouts=[];


	
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
	
	//*********************************
	//set tournament to currently playing=true
	//******************************
	setInterval(function(){
		Tournament.find({players:{ '>': 1 }}).
		exec
		(
		function afterwards(tournyerr,tournyRecords)
		{
			console.log("looked for tournaments with more than 1 entrant");
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
		);
		
		}
		,sails.config.globals.threeMinutes);
	
	
	
	
	//*********************************
	//judge currently playing tournament
	//******************************
	setInterval(function(){
		Tournament.find({currentlyPlaying:true}).
		exec
		(
		function afterwards(tournyerr,tournyRecords)
		{
			console.log("looked for tournaments currently playing");
			for (tIter in tournyRecords)
			{
			
			console.log("tournaments currently playing:"+JSON.stringify(tournyRecords[tIter]));
					var createdDate=new Date(records[iter].createdAt);
					console.log(Date.now()-createdDate);
			
			}
		
		}
		);
		
		}
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
										setupTournamentGames(record.id);
										//return res.send(sender);
										});
									});
							
							setTimeout(activate_tournament,sails.config.globals.sixtySixMinutes,newcreatedT);
						});
			
		}
				
	//	records.activated=true;
		//records.save();
		
	}
	
	function setupTournamentGames(thetournid)
	{
		console.log("setupTournamentGames");
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
						
		},sails.config.globals.threeMinutes);
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

