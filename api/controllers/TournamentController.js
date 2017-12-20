/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	upcomingTournamentsWithTime:function(req,res){
	Tournament.find({ activated:false,sort: 'timeToAvailable ASC'}).exec(function(err,latestOne)
		{
			Tournament.find({activated:true,sort: 'createdAt DESC',limit:1}).exec(function(err2,latestOne2)
			{
			var dat=Date.now();
			console.log(dat);
			console.log("latestone"+JSON.stringify(latestOne));
			console.log("latestone2"+JSON.stringify(latestOne2));
			latestOne.push(latestOne2[0]);
			sender={serverTime:dat,tourneys:latestOne};
			
				setTimeOut(function()
					{
						
						console.log("three minutes after tournament activation");
							
							Tournamententry.find({tournid:latestOne2.id}).exec(function(err3,entries)
							{
								console.log("entries "+JSON.stringify(entries));
								for (playerIter in entries)
								{
								
								
									console.log("every other player than "+entries[playerIter].player);
									for(otherIter in entries)
									{
										if(entries[otherIter].player != entries[playerIter].player)
										{
										console.log("game between "+entries[otherIter].player+" and "+entries[playerIter].player);
										}
									}
									
									
								}
							});
						
					},180000);
			
			return res.send(sender);
			});
		});
	}
};

